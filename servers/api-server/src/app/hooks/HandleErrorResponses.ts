import {
  Hook,
  HookDecorator,
  isHttpResponseBadRequest,
  isHttpResponseServerError,
  isHttpResponseUnauthorized,
} from '@foal/core';

export const HandleErrorResponses = (): HookDecorator => {
  return Hook(() => {
    return response => {
      if (isHttpResponseBadRequest(response)) {
        throw response;
      }
      if (isHttpResponseServerError(response)) {
        throw response;
      }
      if (isHttpResponseUnauthorized(response)) {
        throw response;
      }
    }
  });
}
