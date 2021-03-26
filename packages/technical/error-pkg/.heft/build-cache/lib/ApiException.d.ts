import { Exception } from '@poppinss/utils';
import { ObjectLiteral } from 'types-pkg';
export declare class ApiException extends Exception {
    static readonly defaultMessage = "E_UNKNOWN_ERROR";
    static readonly defaultStatus = 500;
    static readonly defaultCode = "E_UNKNOWN_ERROR";
    values: ObjectLiteral;
    constructor(error?: Partial<ApiErrorObject> | undefined);
    static from(value: any, values?: ObjectLiteral | undefined): ApiException;
    private static fromError;
    private static fromErrorData;
    toObject(): ApiErrorObject;
}
export interface ApiErrorObject {
    message: string;
    status: number;
    code: string;
    values: ObjectLiteral;
}
//# sourceMappingURL=ApiException.d.ts.map