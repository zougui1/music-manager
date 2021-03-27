import { Hook, HookDecorator, isHttpResponseBadRequest } from '@foal/core';

export const HandleBadRequestResponse = (): HookDecorator => {
  return Hook(() => {
    return response => {
      if (isHttpResponseBadRequest(response)) {
        throw response;
      }
    }
  });
}
