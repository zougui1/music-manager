import { createError } from 'error-pkg';

const errors = {
  nonexistentTranslation: {
    messageCode: 'errors.translations.nonexistent',
    code: 'E_NONEXISTENT_TRANSLATION',
    status: 500,
  },
};

export class NonexistentTranslationError extends createError<{ translationKey: string }>(errors.nonexistentTranslation) {}
