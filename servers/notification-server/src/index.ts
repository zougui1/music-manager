import 'source-map-support/register';

// std
import * as http from 'http';

// 3p
import { Config, createApp, displayServerURL } from '@foal/core';

import './setup';
// App
import { AppController } from './app/controllers';
import { startNotifications } from './app/notifications';

async function main() {
  const app = await createApp(AppController);
  startNotifications();

  const httpServer = http.createServer(app);
  const port = Config.get('port', 'number', 3001);
  httpServer.listen(port, () => displayServerURL(port));

  const disconnect = (signal: string) => () => {
    console.log(`[HTTP] received the signal "${signal}", closing HTTP server.`);
    httpServer.close();
  }

  process.once('SIGINT', disconnect('SIGINT'));
  process.once('SIGTERM', disconnect('SIGTERM'));
  process.once('exit', disconnect('exit'));
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
