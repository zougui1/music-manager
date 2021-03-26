import { createError } from 'error-pkg';

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

export class YoutubeInvalidUrlError extends createError(youtubeErrors.invalid) { }
export class YoutubeVideoNotFoundError extends createError(youtubeErrors.videoNotFound) { }
