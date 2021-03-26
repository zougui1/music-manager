"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.observe = exports.on = void 0;
const rxjs_1 = require("rxjs");
const lowAmqpApi_1 = require("./lowAmqpApi");
const utils_1 = require("../utils");
const subscribe = async (queueName, listener, forTypes = []) => {
    if (!lowAmqpApi_1.isConnected()) {
        await new Promise(res => lowAmqpApi_1.connectionEvent.on('connection', res));
    }
    await lowAmqpApi_1.listenQueue(queueName, (message) => {
        const { messageType } = message.headers;
        if (!forTypes.length || (messageType && forTypes.includes(messageType))) {
            listener(message);
        }
    });
};
function on(queueNameOrEvent, listener, forTypes = []) {
    if (utils_1.isNativeEvent(queueNameOrEvent)) {
        lowAmqpApi_1.connectionEvent.on(queueNameOrEvent.slice(1), listener);
    }
    else {
        subscribe(queueNameOrEvent, listener, forTypes);
    }
    return exports.actions;
}
exports.on = on;
function observe(queueNameOrEvent, forTypes = []) {
    return new rxjs_1.Observable(subscriber => {
        on(queueNameOrEvent, (msg) => {
            subscriber.next(msg);
        }, forTypes);
    });
}
exports.observe = observe;
exports.actions = {
    on,
};
//# sourceMappingURL=amqpActions.js.map