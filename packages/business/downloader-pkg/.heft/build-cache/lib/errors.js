"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloaderInvalidUrlError = void 0;
const error_pkg_1 = require("error-pkg");
const downloaderErrors = {
    invalidUrl: {
        messageCode: 'errors.downloader.invalidUrl',
        status: 400,
        code: 'E_DOWNLOADER_INVALID_URL',
    },
};
class DownloaderInvalidUrlError extends error_pkg_1.createError(downloaderErrors.invalidUrl) {
}
exports.DownloaderInvalidUrlError = DownloaderInvalidUrlError;
//# sourceMappingURL=errors.js.map