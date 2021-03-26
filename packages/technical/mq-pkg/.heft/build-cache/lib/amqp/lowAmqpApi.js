"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = exports.start = exports.listenQueue = exports.isConnected = exports.connectionEvent = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const events_1 = require("events");
const utils_1 = require("../utils");
let connection;
exports.connectionEvent = new events_1.EventEmitter();
const disconnect = (signal) => {
    return async () => {
        console.log(`[AMQP] ${signal} signal received.`);
        if (!connection) {
            console.log('[AMQP] No subscription to close.');
            return;
        }
        console.log('[AMQP] Closing subscription.');
        await connection.close();
        exports.connectionEvent.emit('disconnect', signal);
        console.log('[AMQP] Subscription closed.');
    };
};
const isConnected = () => {
    return !!connection;
};
exports.isConnected = isConnected;
const handleMessage = (listener, ack) => (message) => {
    if (!message) {
        return;
    }
    const acknowledge = (allUpTo) => {
        ack(message, allUpTo);
    };
    listener({
        body: JSON.parse(message.content.toString()).payload,
        headers: message.properties.headers,
        ack: acknowledge,
    });
};
const listenQueue = async (queueName, listener) => {
    if (!connection) {
        return;
    }
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    await channel.consume(queueName, handleMessage(listener, channel.ack.bind(channel)), { noAck: false });
};
exports.listenQueue = listenQueue;
const connect = async () => {
    if (!process.env.RABBITMQ_SERVER_URL) {
        throw new Error('The environment variable \'RABBITMQ_SERVER_URL\' is missing');
    }
    return await amqplib_1.default.connect(process.env.RABBITMQ_SERVER_URL);
};
const start = async () => {
    if (connection) {
        return connection;
    }
    connection = await connect();
    utils_1.disconnectOnProcessExit(disconnect);
    exports.connectionEvent.emit('connection', connection);
    return connection;
};
exports.start = start;
const publish = async (queueName, content, headers) => {
    const connection = await connect();
    const body = { payload: content };
    const bodyString = JSON.stringify(body);
    try {
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        await channel.sendToQueue(queueName, Buffer.from(bodyString), { headers, persistent: true });
        console.log(`[AMQP] Sent \'${bodyString}\' with the headers \'${JSON.stringify(headers)}\'`);
        await channel.close();
    }
    finally {
        await connection.close();
    }
};
exports.publish = publish;
//# sourceMappingURL=lowAmqpApi.js.map