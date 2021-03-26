"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ffmpeg = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
function ffmpeg(inputOrOptions, options) {
    const command = fluent_ffmpeg_1.default(inputOrOptions, options);
    const promise = new Promise((resolve, reject) => {
        command.on('end', resolve).on('error', reject);
    });
    command.promise = promise;
    return command;
}
exports.ffmpeg = ffmpeg;
//# sourceMappingURL=ffmpeg.js.map