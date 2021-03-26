import { Hook, HookDecorator, HttpResponse, isHttpResponseServerError } from '@foal/core';

import { generateToken } from '../utils';

export const RefreshJWT = (): HookDecorator => {
  return Hook(ctx => {
    if (!ctx.user) {
      return;
    }

    return (response: HttpResponse) => {
      if (isHttpResponseServerError(response)) {
        return;
      }

      const newToken = generateToken(ctx.user);
      response.setHeader('Authorization', newToken);
    }
  });
}
