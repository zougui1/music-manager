import { createError } from 'error-pkg';

import { UrlType } from './data';

const spotifyErrors = {
  notFound: {
    messageCode: 'errors.spotify.notFound',
    status: 404,
    code: 'E_SPOTIFY_NOT_FOUND',
  },
  invalidUrl: {
    messageCode: 'errors.spotify.invalidUrl',
    status: 400,
    code: 'E_SPOTIFY_INVALID_URL',
  },
  unhandledType: {
    messageCode: 'errors.spotify.unhandledType',
    status: 400,
    code: 'E_SPOTIFY_UNHANDLED_TYPE',
  },
  unknown: {
    messageCode: 'errors.spotify.unknown',
    status: 500,
    code: 'E_SPOTIFY_UNKNOWN',
  },
};

export class SpotifyNotFoundError extends createError<{ type: UrlType }>(spotifyErrors.notFound) { }
export class SpotifyInvalidUrlError extends createError(spotifyErrors.invalidUrl) { }
export class SpotifyUnhandledTypeError extends createError(spotifyErrors.unhandledType) { }
export class SpotifyUnknownError extends createError(spotifyErrors.unknown) {}
