"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = exports.toArray = void 0;
const toArray = (value) => {
    return Array.isArray(value) ? value : [value];
};
exports.toArray = toArray;
const last = (array) => {
    return array[array.length - 1];
};
exports.last = last;
//# sourceMappingURL=array.js.map