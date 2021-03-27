import { Hook, HookDecorator, HttpResponseOK } from '@foal/core';

import { setCors } from '../utils';

export const HandleOptionsRequest = (): HookDecorator => {
  return Hook(ctx => {
    if (ctx.request.method === 'OPTIONS') {
      const response = setCors(new HttpResponseOK());
      return response;
    }
  });
}
