import { Config } from '@foal/core';

process.env.RABBITMQ_SERVER_URL = Config.get('rabbitmq.url', 'string');

process.env.MERCURE_URL = Config.get('mercure.url', 'string');
process.env.PUBLISHER_JWT = Config.get('mercure.publisherJwt', 'string');
