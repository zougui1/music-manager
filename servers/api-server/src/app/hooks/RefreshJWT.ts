import { Hook, HookDecorator, HttpResponse, isHttpResponseServerError } from '@foal/core';

import { generateToken } from '../utils';

export const RefreshJWT = (): HookDecorator => {
  return Hook(ctx => {
    if (!ctx.user) {
      return;
    }

    return async (response: HttpResponse) => {
      if (isHttpResponseServerError(response)) {
        return;
      }

      const newToken = generateToken(ctx.user);
      let exposedHeaders = ['Access-Token'];
      const originalExposedHeaders = response.getHeader('Access-Control.Expose-Headers');

      if (originalExposedHeaders) {
        exposedHeaders = exposedHeaders.concat(originalExposedHeaders.split(','));
      }

      response
        .setHeader('Access-Token', newToken)
        .setHeader('Access-Control-Expose-Headers', exposedHeaders.join(', '));
    }
  });
}
