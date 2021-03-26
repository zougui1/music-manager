"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeVideoNotFoundError = exports.YoutubeInvalidUrlError = void 0;
const error_pkg_1 = require("error-pkg");
const youtubeErrors = {
    invalid: {
        messageCode: 'errors.youtube.invalidUrl',
        status: 400,
        code: 'E_VIDEO_INVALID_URL',
    },
    videoNotFound: {
        messageCode: 'errors.youtube.video.notFound',
        status: 404,
        code: 'E_VIDEO_NOT_FOUND',
    },
};
class YoutubeInvalidUrlError extends error_pkg_1.createError(youtubeErrors.invalid) {
}
exports.YoutubeInvalidUrlError = YoutubeInvalidUrlError;
class YoutubeVideoNotFoundError extends error_pkg_1.createError(youtubeErrors.videoNotFound) {
}
exports.YoutubeVideoNotFoundError = YoutubeVideoNotFoundError;
//# sourceMappingURL=errors.js.map