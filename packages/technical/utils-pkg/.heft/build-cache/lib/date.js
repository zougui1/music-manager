"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDuration = void 0;
const moment_1 = __importDefault(require("moment"));
const reNoHour = /^00:/;
const formatDuration = (duration) => {
    if (!duration) {
        return '00:00';
    }
    // we subtract by one hour since it is a duration and
    // not a date (new Date(0) starts at 1 am)
    return moment_1.default(duration)
        .subtract(1, 'hours')
        .format('HH:mm:ss')
        // we remove the hour if the duration is less than one hour
        .replace(reNoHour, '');
};
exports.formatDuration = formatDuration;
//# sourceMappingURL=date.js.map