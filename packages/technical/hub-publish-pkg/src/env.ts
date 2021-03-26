import env from 'env-pkg';

export const HUB_URL = env.get('MERCURE_URL').required().asUrlString();
export const PUBLISHER_JWT = env.get('PUBLISHER_JWT').required().asString();
