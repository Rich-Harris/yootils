function random(a, b) {
    if (b === undefined)
        return Math.random() * a;
    return a + Math.random() * (b - a);
}

function pickRandom(array) {
    var i = ~~(random(array.length));
    return array[i];
}

function queue(max) {
    if (max === void 0) { max = 4; }
    var items = []; // TODO
    var pending = 0;
    function dequeue() {
        if (pending >= max)
            return;
        if (items.length === 0)
            return;
        pending += 1;
        var _a = items.shift(), fn = _a.fn, fulfil = _a.fulfil, reject = _a.reject;
        var promise = fn();
        try {
            promise.then(fulfil, reject).then(function () {
                pending -= 1;
                dequeue();
            });
        }
        catch (err) {
            reject(err);
            pending -= 1;
            dequeue();
        }
        dequeue();
    }
    return {
        add: function (fn) {
            return new Promise(function (fulfil, reject) {
                items.push({ fn: fn, fulfil: fulfil, reject: reject });
                dequeue();
            });
        }
    };
}

function linear(domain, range) {
    var d0 = domain[0];
    var r0 = range[0];
    var m = (range[1] - r0) / (domain[1] - d0);
    return Object.assign(function (num) {
        return r0 + (num - d0) * m;
    }, {
        inverse: function () { return linear(range, domain); }
    });
}

function clamp(num, min, max) {
    return num < min ? min : num > max ? max : num;
}

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function commas(num) {
    var parts = String(num).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

export { pickRandom, queue, linear as linearScale, clamp, random, commas };
