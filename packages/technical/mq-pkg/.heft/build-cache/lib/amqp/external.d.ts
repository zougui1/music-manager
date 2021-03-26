import { ObjectLiteral, ConnectionHandler, DisconnectHandler, MessageHandler, QueueActions, MessageObserver, ConnectionObserver } from '../types';
export declare const forQueue: (queueName: string) => {
    on: {
        (eventName: '$connection', listener: ConnectionHandler): QueueActions;
        (eventName: '$disconnect', listener: DisconnectHandler): QueueActions;
        (listener: MessageHandler, forTypes?: string[] | undefined): QueueActions;
    };
    publish: (content: any, headers?: ObjectLiteral | null | undefined) => Promise<void>;
    observe: {
        (eventName: '$connection'): ConnectionObserver;
        (eventName: '$disconnect'): ConnectionObserver;
        (forTypes?: string[] | undefined): MessageObserver;
    };
};
//# sourceMappingURL=external.d.ts.map