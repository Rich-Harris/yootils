function linear(domain, range) {
    var d0 = domain[0];
    var r0 = range[0];
    var m = (range[1] - r0) / (domain[1] - d0);
    return function (num) {
        return r0 + (num - d0) * m;
    };
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

export { linear as linearScale, clamp, commas };
