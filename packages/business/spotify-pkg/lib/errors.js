"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyUnknownError = exports.SpotifyUnhandledTypeError = exports.SpotifyInvalidUrlError = exports.SpotifyNotFoundError = void 0;
const error_pkg_1 = require("error-pkg");
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
class SpotifyNotFoundError extends error_pkg_1.createError(spotifyErrors.notFound) {
}
exports.SpotifyNotFoundError = SpotifyNotFoundError;
class SpotifyInvalidUrlError extends error_pkg_1.createError(spotifyErrors.invalidUrl) {
}
exports.SpotifyInvalidUrlError = SpotifyInvalidUrlError;
class SpotifyUnhandledTypeError extends error_pkg_1.createError(spotifyErrors.unhandledType) {
}
exports.SpotifyUnhandledTypeError = SpotifyUnhandledTypeError;
class SpotifyUnknownError extends error_pkg_1.createError(spotifyErrors.unknown) {
}
exports.SpotifyUnknownError = SpotifyUnknownError;
//# sourceMappingURL=errors.js.map