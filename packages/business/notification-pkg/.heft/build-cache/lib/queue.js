"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyMusicDownloadProgress = exports.observeMusicDownloadProgress = void 0;
const mq_pkg_1 = require("mq-pkg");
const rxjs_1 = require("rxjs");
;
const operators_1 = require("rxjs/operators");
const mq_1 = require("./mq");
const messageTypes = __importStar(require("./messageTypes"));
const BUFFER_TIME = 300;
const observeMusicDownloadProgress = (options) => {
    var _a;
    return mq_1.mqClient
        .observe([messageTypes.NOTIFY_MUSIC_DOWNLOAD_PROGRESS])
        .pipe(
    // group all the messages consumed within XXX milliseconds
    operators_1.window(rxjs_1.interval((_a = options === null || options === void 0 ? void 0 : options.bufferTime) !== null && _a !== void 0 ? _a : BUFFER_TIME)), 
    // group consumed messages by video ID and turn them into arrays
    // TODO group by user ID
    operators_1.mergeMap(msg$ => msg$.pipe(operators_1.groupBy(msg => msg.body.videoId), operators_1.mergeMap(group => group.pipe(operators_1.toArray())))), 
    // turn an array of messages into an object wrapping the messages
    operators_1.map(messages => mq_pkg_1.handleManyMessages(messages)));
};
exports.observeMusicDownloadProgress = observeMusicDownloadProgress;
const notifyMusicDownloadProgress = (data) => {
    mq_1.mqClient.publish(data, { messageType: messageTypes.NOTIFY_MUSIC_DOWNLOAD_PROGRESS });
};
exports.notifyMusicDownloadProgress = notifyMusicDownloadProgress;
//# sourceMappingURL=queue.js.map