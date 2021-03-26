"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecimals = exports.range = exports.isInRange = void 0;
const reNumber = /^[0-9]+/;
const isInRange = (value, min, max) => {
    return value >= min && value <= max;
};
exports.isInRange = isInRange;
const range = (start, end, interval) => {
    let _start = start;
    let _end = end;
    const _interval = interval !== null && interval !== void 0 ? interval : 1;
    if (end === undefined) {
        _start = 0;
        _end = start;
    }
    const array = [];
    for (let i = _start; i <= _end; i += _interval) {
        array.push(i);
    }
    return array;
};
exports.range = range;
const getDecimals = (number) => {
    return +number.toString().replace(reNumber, '0');
};
exports.getDecimals = getDecimals;
//# sourceMappingURL=math.js.map