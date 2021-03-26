import env from 'env-pkg';

export const TEMP_DIR = env.get('TEMP_DIR').required().asString();
export const APP_DIR = env.get('APP_DIR').required().asString();
