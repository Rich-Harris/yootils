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

export { linear as linearScale, clamp };
