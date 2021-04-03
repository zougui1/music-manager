import { Exception } from '@poppinss/utils';
import { ObjectLiteral } from 'types-pkg';

const errors = {
  unhandledErrorCode: {
    messageCode: 'errors.unhandledErrorCode',
    status: 500,
    code: 'E_UNHANDLED_ERROR_CODE',
  },
};

export class UnhandledErrorCodeError extends Exception {

  values: ObjectLiteral = {};

  constructor(messageCode?: string | null | undefined, values?: ObjectLiteral | undefined) {
    super(
      messageCode || errors.unhandledErrorCode.messageCode,
      errors.unhandledErrorCode.status,
    );

    this.values = values ?? {};
    this.code = errors.unhandledErrorCode.code;
  }
}
