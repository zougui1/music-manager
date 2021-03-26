"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleManyMessages = void 0;
const handleManyMessages = (messages) => {
    const ackAll = (allUpTo) => {
        for (const message of messages) {
            message.ack(allUpTo);
        }
    };
    return {
        ackAll,
        messages,
    };
};
exports.handleManyMessages = handleManyMessages;
//# sourceMappingURL=helpers.js.map