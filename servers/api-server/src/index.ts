import 'source-map-support/register';
import './setup';

// std
import * as http from 'http';

// 3p
import { Config, createApp, displayServerURL } from '@foal/core';

// App
import { AppController } from './app/controllers';

async function main() {
  const app = await createApp(AppController) as http.RequestListener;

  const httpServer = http.createServer(app);
  const port = Config.get('port', 'number', 3001);
  httpServer.listen(port, () => displayServerURL(port));
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
