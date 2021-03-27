import { IAppController, Context, HttpResponse } from '@foal/core';
import { ApiException } from 'error-pkg';
import { ApiController } from './api';
import { AuthController } from './auth';
import { FileController } from './file.controller';
import { OpenApiController } from './openApi.controller';
export declare class AppController implements IAppController {
    subControllers: (import("@foal/core").Class<FileController> | import("@foal/core").Class<ApiController> | import("@foal/core").Class<OpenApiController> | import("@foal/core").Class<AuthController>)[];
    private translationFailed;
    init(): Promise<void>;
    handleError(error: any, ctx: Context, originalError?: ApiException): HttpResponse;
    private getInternalError;
    private getPublicError;
    private translateMessage;
}
//# sourceMappingURL=app.controller.d.ts.map