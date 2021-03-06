import { Observable } from 'rxjs';
import { Connection } from 'amqplib';

export interface ObjectOf<T> {
  [key: string]: T;
}

export type ObjectLiteral = ObjectOf<any>;

export type MessageHandler<TBody = unknown> = (message: Message<TBody>) => any;
export type ConnectionHandler = (connection: Connection) => any;
export type DisconnectHandler = (connection: Connection) => any;

export interface Actions {
  on(eventName: '$connection', listener: ConnectionHandler): Actions;
  on(eventName: '$disconnect', listener: DisconnectHandler): Actions;
  on(queueName: string, listener: MessageHandler, forTypes?: string[] | undefined): Actions;
}

export interface QueueActions {
  on(eventName: '$connection', listener: ConnectionHandler): QueueActions;
  on(eventName: '$disconnect', listener: DisconnectHandler): QueueActions;
  on(listener: MessageHandler, forTypes?: string[] | undefined): QueueActions;
}

export interface Message<TBody = unknown> {
  body: TBody;
  headers: ObjectLiteral;
  ack: (allUpTo?: boolean | undefined) => void;
}

export type MessageObserver<TBody = unknown> = Observable<Message<TBody>>;
export type ConnectionObserver = Observable<Connection>;
export type EventObserver<TBody = unknown> = Observable<Message<TBody> | Connection>;

export interface ManyMessages<TBody = unknown> {
  ackAll: (allUpTo?: boolean | undefined) => void;
  messages: Message<TBody>[];
}
