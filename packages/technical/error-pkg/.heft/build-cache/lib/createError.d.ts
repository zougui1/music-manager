import { ApiException } from './ApiException';
import { ObjectLiteral } from 'types-pkg';
export declare function createError<TValues extends {} = ObjectLiteral>(errorData: IErrorData): ApiError<TValues>;
export interface IErrorData {
    messageCode: string;
    status: number;
    code: string;
    values?: ObjectLiteral | undefined;
}
export declare type ApiErrorConstructor<TValues> = new (messageCode?: string | undefined | null, values?: TValues | undefined) => ApiException;
export declare type ApiError<TValues = ObjectLiteral> = Omit<typeof ApiException, 'new'> & IErrorData & ApiErrorConstructor<TValues>;
//# sourceMappingURL=createError.d.ts.map