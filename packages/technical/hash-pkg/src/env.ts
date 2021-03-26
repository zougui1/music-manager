import env from 'env-pkg';

export const HASH_MEMORY_COST = env.get('HASH_MEMORY_COST').required().asIntPositive();
export const HASH_PARALLELISM = env.get('HASH_PARALLELISM').required().asIntPositive();
export const HASH_TIME_COST = env.get('HASH_TIME_COST').required().asIntPositive();
export const HASH_LENGTH = env.get('HASH_LENGTH').required().asIntPositive();
