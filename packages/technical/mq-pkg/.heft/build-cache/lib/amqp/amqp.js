"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observe = exports.on = void 0;
const lowAmqpApi_1 = require("./lowAmqpApi");
const amqpActions_1 = require("./amqpActions");
function on(queueNameOrEvent, listener, forTypes = []) {
    lowAmqpApi_1.start();
    return amqpActions_1.on(queueNameOrEvent, listener, forTypes);
}
exports.on = on;
function observe(eventName, forTypes = []) {
    lowAmqpApi_1.start();
    return amqpActions_1.observe(eventName, forTypes);
}
exports.observe = observe;
//# sourceMappingURL=amqp.js.map