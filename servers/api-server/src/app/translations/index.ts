import flatten from 'flat';

import en from './en';
import { NonexistentTranslationError } from './errors';
import { ObjectLiteral, ObjectOf } from 'types-pkg';

const defaultLanguage = 'en';
const translations: ObjectOf<ObjectOf<string>> = {
  en: flatten(en),
};

export const getMessage = (language: string | undefined, key: string, values: ObjectLiteral = {}): string => {
  const translation = translations[language ?? defaultLanguage] || translations[defaultLanguage];

  if (!(key in translation)) {
    throw new NonexistentTranslationError(null, { translationKey: key });
  }

  let message = translation[key];

  for (const [name, value] of Object.entries(values)) {
    const regex = new RegExp(`\\{${name}\\}`, 'g');
    message = message.replace(regex, value);
  }

  return message;
}
