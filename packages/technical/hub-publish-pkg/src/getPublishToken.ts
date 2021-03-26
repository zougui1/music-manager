import jwt from 'jsonwebtoken';

export const getPublishToken = (topic: string, key: jwt.Secret, options: jwt.SignOptions = {}) => {
  const payload = {
    mercure: { publish: [topic] },
  };
  const jwtOptions: jwt.SignOptions = {
    expiresIn: 60,
    noTimestamp: true,
    ...options,
  };

  return jwt.sign(payload, key, jwtOptions);
}
