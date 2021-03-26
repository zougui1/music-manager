import * as mqClientPkg from 'mq-pkg';
export declare const mqClient: {
    on: {
        (eventName: "$connection", listener: mqClientPkg.ConnectionHandler): mqClientPkg.QueueActions;
        (eventName: "$disconnect", listener: mqClientPkg.DisconnectHandler): mqClientPkg.QueueActions;
        (listener: mqClientPkg.MessageHandler, forTypes?: string[] | undefined): mqClientPkg.QueueActions;
    };
    publish: (content: any, headers?: mqClientPkg.ObjectLiteral | null | undefined) => Promise<void>;
    observe: {
        (eventName: "$connection"): mqClientPkg.ConnectionObserver;
        (eventName: "$disconnect"): mqClientPkg.ConnectionObserver;
        (forTypes?: string[] | undefined): mqClientPkg.MessageObserver;
    };
};
//# sourceMappingURL=mq.d.ts.map