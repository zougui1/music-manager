"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNativeEvent = exports.disconnectOnProcessExit = void 0;
const disconnectOnProcessExit = (disconnect) => {
    process.once('SIGINT', disconnect('SIGINT'));
    process.once('SIGTERM', disconnect('SIGTERM'));
    process.once('exit', disconnect('exit'));
};
exports.disconnectOnProcessExit = disconnectOnProcessExit;
const nativeEvents = {
    $connection: true,
    $disconnect: true,
};
const isNativeEvent = (event) => {
    return !!nativeEvents[event];
};
exports.isNativeEvent = isNativeEvent;
//# sourceMappingURL=utils.js.map