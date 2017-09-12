"use strict";
exports.__esModule = true;
function clamp(num, min, max) {
    return num < min ? min : num > max ? max : num;
}
exports["default"] = clamp;
