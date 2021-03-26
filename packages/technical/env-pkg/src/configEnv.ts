import path from 'path';
import dotenv from 'dotenv';

let configured = false;
const cwd = path.join(process.cwd(), 'config');

export const config = (configDir: string = cwd) => {
  if (configured) {
    return;
  }

  configured = true;
  const { NODE_ENV } = process.env;
  const fileName = '.env';
  let suffix = '';

  switch (NODE_ENV) {
    case 'development':
      suffix = 'dev';
      break;
    case 'production':
      suffix = 'prod';
      break;

    default:
      if (NODE_ENV) {
        suffix = NODE_ENV;
      } else {
        suffix = 'dev'
      }
      break;
  }

  const envFileName = `${fileName}.${suffix}`;
  const commonEnvPath = path.join(configDir, fileName);
  const envPath = path.join(configDir, envFileName);

  dotenv.config({ path: envPath });
  dotenv.config({ path: commonEnvPath });
}
