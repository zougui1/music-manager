import { Exception } from '@poppinss/utils';
import { ObjectLiteral } from 'types-pkg';
export declare class UnhandledErrorCodeError extends Exception {
    values: ObjectLiteral;
    constructor(messageCode?: string | null | undefined, values?: ObjectLiteral | undefined);
}
//# sourceMappingURL=errors.d.ts.map