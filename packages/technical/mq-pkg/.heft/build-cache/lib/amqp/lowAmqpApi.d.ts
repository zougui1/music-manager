/// <reference types="node" />
import { Connection } from 'amqplib';
import { EventEmitter } from 'events';
import { ObjectLiteral, MessageHandler } from '../types';
export declare const connectionEvent: EventEmitter;
export declare const isConnected: () => boolean;
export declare const listenQueue: (queueName: string, listener: MessageHandler) => Promise<void>;
export declare const start: () => Promise<Connection>;
export declare const publish: (queueName: string, content: any, headers?: ObjectLiteral | null | undefined) => Promise<void>;
//# sourceMappingURL=lowAmqpApi.d.ts.map