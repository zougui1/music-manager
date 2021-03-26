"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forQueue = void 0;
const amqp_1 = require("./amqp");
const lowAmqpApi_1 = require("./lowAmqpApi");
const forQueue = (queueName) => {
    const publishQueue = async (content, headers) => {
        await lowAmqpApi_1.publish(queueName, content, headers);
    };
    const getArgs = (eventNameOrListener, listenerOrTypes) => {
        const queue = typeof eventNameOrListener === 'string'
            ? eventNameOrListener
            : queueName;
        const listener = typeof listenerOrTypes === 'function'
            ? listenerOrTypes
            : eventNameOrListener;
        const types = Array.isArray(listenerOrTypes) ? listenerOrTypes : [];
        return {
            queueName: queue,
            listener: listener,
            types,
        };
    };
    function onQueue(eventNameOrListener, listenerOrTypes) {
        const { queueName, listener, types } = getArgs(eventNameOrListener, listenerOrTypes);
        amqp_1.on(queueName, listener, types);
        return queueActions;
    }
    function observeQueue(eventNameOrTypes) {
        if (Array.isArray(eventNameOrTypes)) {
            return amqp_1.observe(queueName, eventNameOrTypes);
        }
        return amqp_1.observe(queueName);
    }
    const queueActions = {
        on: onQueue,
    };
    return {
        on: onQueue,
        publish: publishQueue,
        observe: observeQueue,
    };
};
exports.forQueue = forQueue;
//# sourceMappingURL=external.js.map