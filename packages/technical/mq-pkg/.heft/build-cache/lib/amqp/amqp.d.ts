import { MessageHandler, ConnectionHandler, DisconnectHandler, Actions, MessageObserver, ConnectionObserver } from '../types';
export declare function on(eventName: '$connection', listener: ConnectionHandler): Actions;
export declare function on(eventName: '$disconnect', listener: DisconnectHandler): Actions;
export declare function on(queueName: string, listener: MessageHandler, forTypes: string[]): Actions;
export declare function observe(eventName: '$connection'): ConnectionObserver;
export declare function observe(eventName: '$disconnect'): ConnectionObserver;
export declare function observe(queueName: string, forTypes: string[]): MessageObserver;
//# sourceMappingURL=amqp.d.ts.map