import { ApiException } from './ApiException';
import { ObjectLiteral } from 'types-pkg';

export function createError<TValues extends {} = ObjectLiteral>(errorData: IErrorData): ApiError<TValues>;
export function createError(errorData: IErrorData): ApiError {
  return class ApiError extends ApiException {
    static readonly messageCode = errorData.messageCode;
    static readonly status = errorData.status;
    static readonly code = errorData.code;
    static readonly defaultValues = errorData.values;

    constructor(messageCode?: string | null | undefined, values?: ObjectLiteral | undefined) {
      super({
        message: messageCode || errorData.messageCode,
        status: errorData.status,
        code: errorData.code,
        values: {
          ...(errorData.values ?? {}),
          ...(values ?? {}),
        },
      });
    }
  }
}

export interface IErrorData {
  messageCode: string,
  status: number,
  code: string,
  values?: ObjectLiteral | undefined;
}

export type ApiErrorConstructor<TValues> = new(messageCode?: string | undefined | null, values?: TValues | undefined) => ApiException;
export type ApiError<TValues = ObjectLiteral> = Omit<typeof ApiException, 'new'> & IErrorData & ApiErrorConstructor<TValues>;
