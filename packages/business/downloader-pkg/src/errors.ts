import { createError } from 'error-pkg';

const downloaderErrors = {
  invalidUrl: {
    messageCode: 'errors.downloader.invalidUrl',
    status: 400,
    code: 'E_DOWNLOADER_INVALID_URL',
  },
};

export class DownloaderInvalidUrlError extends createError(downloaderErrors.invalidUrl) { }
