import amqp, { Connection, ConsumeMessage, Channel } from 'amqplib';
import { EventEmitter } from 'events';

import { disconnectOnProcessExit } from '../utils';
import { ObjectLiteral, MessageHandler } from '../types';

let connection: Connection | undefined;
export const connectionEvent = new EventEmitter();
let subConnectionsOpen = 0;

const disconnect = (signal: string) => {
  return () => {
    console.log(`[AMQP] ${signal} signal received.`);

    if (!connection) {
      console.log('[AMQP] No subscription to close.');
      return;
    }

    console.log('[AMQP] Closing subscription.');
    process.exit(0);
    connectionEvent.emit('close-sub-connections');

    connectionEvent.on('sub-connections-closed', async () => {
      if (connection) {
        await connection.close();
        connectionEvent.emit('disconnect', signal);
        console.log('[AMQP] Subscription closed.');
      }
    });
  }
}

const closeSubConnection = async (subConnection: { close: () => any }) => {
  await subConnection.close();

  if (--subConnectionsOpen <= 0) {
    connectionEvent.emit('sub-connections-closed');
  }
}

const createChannel = async (connection: Connection): Promise<Channel> => {
  const channel = await connection.createChannel();
  subConnectionsOpen++;

  connectionEvent.on('close-sub-connections', () => {
    closeSubConnection(channel);
  });

  return channel;
}

export const isConnected = (): boolean => {
  return !!connection;
}

const handleMessage = (listener: MessageHandler, ack: (message: amqp.Message, allUpTo?: boolean | undefined) => void) => (message: ConsumeMessage | null): void => {
  if (!message) {
    return;
  }

  const acknowledge = (allUpTo?: boolean | undefined) => {
    ack(message, allUpTo);
  }

  listener({
    body: JSON.parse(message.content.toString()).payload,
    headers: message.properties.headers,
    ack: acknowledge,
  });
}

export const listenQueue = async (queueName: string, listener: MessageHandler): Promise<void> => {
  if (!connection) {
    return;
  }

  const channel = await createChannel(connection);
  await channel.assertQueue(queueName, { durable: true });
  await channel.consume(queueName, handleMessage(listener, channel.ack.bind(channel)), { noAck: false });
}

const connect = async (): Promise<Connection> => {
  if (!process.env.RABBITMQ_SERVER_URL) {
    throw new Error('The environment variable \'RABBITMQ_SERVER_URL\' is missing');
  }

  return await amqp.connect(process.env.RABBITMQ_SERVER_URL);
}

export const start = async (): Promise<Connection> => {
  if (connection) {
    return connection;
  }

  connection = await connect();
  disconnectOnProcessExit(disconnect);
  connectionEvent.emit('connection', connection);
  return connection;
}

export const publish = async (queueName: string, content: any, headers?: ObjectLiteral | null | undefined): Promise<void> => {
  const connection = await connect();
  subConnectionsOpen++;
  const body = { payload: content };
  const bodyString = JSON.stringify(body);

  connectionEvent.on('close-sub-connections', async () => {
    await closeSubConnection(connection);
  });

  try {
    const channel = await createChannel(connection);

    await channel.assertQueue(queueName, { durable: true });
    await channel.sendToQueue(queueName, Buffer.from(bodyString), { headers, persistent: true });

    //console.log(`[AMQP] Sent \'${bodyString}\' with the headers \'${JSON.stringify(headers)}\'`);

    await channel.close();
  } finally {
    await connection.close();
  }
}
