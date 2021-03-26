import * as mqClientPkg from 'mq-pkg';

const queueName = 'notifications';

export const mqClient = mqClientPkg.mqClient.forQueue(queueName);
