import { createError } from 'error-pkg';

const errors = {
  notFound: {
    messageCode: 'errors.playlist.notFound',
    status: 404,
    code: 'E_PLAYLIST_NOT_FOUND',
  },
};

export class PlaylistNotFoundError extends createError(errors.notFound) {}
