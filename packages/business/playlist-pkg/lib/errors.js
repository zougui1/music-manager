"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistNotFoundError = void 0;
const error_pkg_1 = require("error-pkg");
const errors = {
    notFound: {
        messageCode: 'errors.playlist.notFound',
        status: 404,
        code: 'E_PLAYLIST_NOT_FOUND',
    },
};
class PlaylistNotFoundError extends error_pkg_1.createError(errors.notFound) {
}
exports.PlaylistNotFoundError = PlaylistNotFoundError;
//# sourceMappingURL=errors.js.map