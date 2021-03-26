import { Config } from '@foal/core';
import { getSecretOrPrivateKey } from '@foal/jwt';
import { sign } from 'jsonwebtoken';

const tokenExpirationInterval = Config.getOrThrow('settings.jwt.tokenExpirationInterval', 'string');

export const generateToken = (user: { email: string }): string => {
  return sign(
    { email: user.email },
    getSecretOrPrivateKey(),
    { expiresIn: tokenExpirationInterval },
  );
}
