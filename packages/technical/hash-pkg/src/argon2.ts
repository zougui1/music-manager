import argon2 from 'argon2';

import { HASH_MEMORY_COST, HASH_LENGTH, HASH_PARALLELISM, HASH_TIME_COST } from './env';

export const hash = async (plainText: string): Promise<string> => {
  return argon2.hash(plainText, {
    memoryCost: HASH_MEMORY_COST,
    parallelism: HASH_PARALLELISM,
    hashLength: HASH_LENGTH,
    timeCost: HASH_TIME_COST,
  });
}

export const verify = argon2.verify;
