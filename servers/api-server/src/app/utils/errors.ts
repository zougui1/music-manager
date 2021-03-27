import { ObjectLiteral } from 'types-pkg';

export const convertErrorDescriptionToCode = (description: string): IConvertedCode => {
  description = description.toLowerCase();

  if (description.includes('Authorization header not found')) {
    return {
      messageCode: 'errors.token.notFound',
      code: 'E_TOKEN_NOT_FOUND',
    };
  }

  if (description.includes('jwt expired')) {
    return {
      messageCode: 'errors.token.expired',
      code: 'E_TOKEN_EXPIRED',
    };
  }

  return {
    messageCode: 'errors.unhandledDescription',
    code: 'E_UNHANDLED_DESCRIPTION',
    values: { description },
  };
}

export interface IConvertedCode {
  messageCode: string;
  code: string;
  values?: ObjectLiteral;
}
