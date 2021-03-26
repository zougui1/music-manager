import { createError } from 'error-pkg';

const errors = {
  incorrectCredentials: {
    messageCode: 'errors.user.credentials.incorrect',
    status: 401,
    code: 'E_INCORRECT_CREDENTIAL',
  },
};

export class IncorrectCredentialsError extends createError(errors.incorrectCredentials) {}
