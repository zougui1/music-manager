import { UnhandledErrorCodeError } from './errors';

export const convertMessage = (code: string): string => {
  switch (code) {
    case 'E_ROUTE_NOT_FOUND':
      return 'errors.route.notFound';

    default:
      throw new UnhandledErrorCodeError(null, { code });
  }
}
