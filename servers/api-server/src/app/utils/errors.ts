import { ObjectLiteral } from 'types-pkg';

export const convertErrorDescriptionToCode = (description: string): IConvertedCode => {
  if (description.includes('Authorization header not found')) {
    return {
      message: 'errors.token.notFound',
      code: 'E_TOKEN_NOT_FOUND',
    };
  }

  return {
    message: 'errors.unhandledDescription',
    code: 'E_UNHANDLED_DESCRIPTION',
    values: { description },
  };
}

export interface IConvertedCode {
  message: string;
  code: string;
  values?: ObjectLiteral;
}
