import { Config } from '@foal/core';
import { getSecretOrPrivateKey } from '@foal/jwt';
import { sign } from 'jsonwebtoken';

import { UserContext } from '../types';

const tokenExpirationInterval = Config.getOrThrow('settings.jwt.tokenExpirationInterval', 'string');

export const generateToken = (user: UserContext): string => {
  return sign(
    { id: user.id },
    getSecretOrPrivateKey(),
    { expiresIn: tokenExpirationInterval },
  );
}
