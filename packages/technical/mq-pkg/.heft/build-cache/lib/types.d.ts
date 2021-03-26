import { Observable } from 'rxjs';
import { Connection } from 'amqplib';
export interface ObjectOf<T> {
    [key: string]: T;
}
export declare type ObjectLiteral = ObjectOf<any>;
export declare type MessageHandler = (message: Message) => any;
export declare type ConnectionHandler = (connection: Connection) => any;
export declare type DisconnectHandler = (connection: Connection) => any;
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
export interface Message {
    body: any;
    headers: ObjectLiteral;
    ack: (allUpTo?: boolean | undefined) => void;
}
export declare type MessageObserver = Observable<Message>;
export declare type ConnectionObserver = Observable<Connection>;
export declare type EventObserver = Observable<Message | Connection>;
export interface ManyMessages {
    ackAll: (allUpTo?: boolean | undefined) => void;
    messages: Message[];
}
//# sourceMappingURL=types.d.ts.map