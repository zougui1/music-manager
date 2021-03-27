import { Exception } from '@poppinss/utils';
import { ObjectLiteral } from 'types-pkg';

import { convertMessage } from './convertMessage';

export class ApiException extends Exception {
  static readonly defaultMessage = 'errors.unknown';
  static readonly defaultStatus = 500;
  static readonly defaultCode = 'E_UNKNOWN_ERROR';

  values: ObjectLiteral = {};

  constructor(error?: Partial<ApiErrorObject> | undefined) {
    super(error?.message ?? ApiException.defaultMessage, error?.status ?? ApiException.defaultStatus);

    // we don't give it to the `super` because `Exception`
    // prepends the code to the message which we don't want
    this.code = error?.code ?? ApiException.defaultCode
    this.values = error?.values ?? {};
  }

  //#region public static methods
  static from(value: any, values?: ObjectLiteral | undefined): ApiException {
    if (!value) {
      return new ApiException({ values });
    }

    value.values = {
      ...(value.values ?? {}),
      ...(values ?? {}),
    };

    if (value instanceof ApiException) {
      return value;
    }

    if (value.message) {
      return ApiException.fromError(value);
    }

    if (value.messageCode) {
      return ApiException.fromErrorData(value);
    }

    return new ApiException();
  }
  //#endregion

  //#region private static methods
  private static fromError(value: any): ApiException {
    if (value.status || value.code) {
      if (value.code) {
        value.message = convertMessage(value.code);
      }

      return new ApiException(value);
    }

    return new ApiException(value.message);
  }

  private static fromErrorData(value: any): ApiException {
    value.message = value.messageCode;
    return new ApiException(value);
  }
  //#endregion

  //#region public
  toObject(): ApiErrorObject {
    return {
      message: this.message,
      status: this.status,
      code: this.code ?? ApiException.defaultCode,
      values: this.values,
    };
  }
  //#endregion
}

export interface ApiErrorObject {
  message: string;
  status: number;
  code: string;
  values: ObjectLiteral;
}
