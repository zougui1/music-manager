export interface Env {
  API_SERVER_URL: string;
  MERCURE_URL: string;
  NOTIFICATION_SERVER_URL: string;
}

export const env: Env = {
  API_SERVER_URL: required('REACT_APP_API_SERVER_URL'),
  MERCURE_URL: required('REACT_APP_MERCURE_URL'),
  NOTIFICATION_SERVER_URL: required('REACT_APP_NOTIFICATION_SERVER_URL'),
};


function required(name: string): string {
  const envVar = process.env[name];

  if (!envVar) {
    throw new Error(`The env variable "${name}" is required.`);
  }

  return envVar;
}
