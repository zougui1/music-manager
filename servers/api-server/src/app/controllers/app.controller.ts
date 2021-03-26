import { controller, IAppController, Context, HttpResponse, Config, Hook } from '@foal/core';
import { createConnection } from 'database-pkg';
import { ApiException, ApiErrorObject } from 'error-pkg';
import { ObjectLiteral } from 'types-pkg';

import { ApiController } from './api';
import { FileController } from './file.controller';
import { OpenApiController } from './openApi.controller';
import { getMessage } from '../translations';
import { PublicError } from '../types';

@Hook(() => response => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  console.log('app hook')
})
export class AppController implements IAppController {
  subControllers = [
    controller('/files', FileController),
    controller('/api', ApiController),
    controller('/swagger', OpenApiController),
  ];

  private translationFailed = false;

  async init(): Promise<void> {
    await createConnection();
  }

  handleError(error: any, ctx: Context, originalError?: ApiException): HttpResponse {
    console.error(error);
    const { headers, path } = ctx.request as { path: string, headers: { [index: string]: string | undefined } };
    const language = headers['content-language']?.split('-')[0];
    const errorValues = {
      route: path,
    };

    const sourceError = originalError ?? error;
    const errorData = this.getInternalError(error, errorValues);
    const translation = this.translateMessage(language, errorData, originalError);

    if ('error' in translation) {
      return this.handleError(translation.error, ctx, sourceError);
    }

    const data = { message: translation.message, path };
    const publicError = this.getPublicError(error, data, sourceError);

    return new Response(publicError);
  }

  //#region private
  private getInternalError(error: any, errorValues: ObjectLiteral): ApiErrorObject {
    const apiError = ApiException.from(error, errorValues);
    return apiError.toObject();
  }

  private getPublicError(errorData: ApiErrorObject, data: { message: string, path: string }, sourceError: any): PublicError {
    const publicError: PublicError = {
      ...data,
      status: errorData.status,
      code: errorData.code,
    };

    if (Config.get('settings.debug', 'boolean') && sourceError instanceof Error) {
      publicError.stack = sourceError.stack?.split('\n');
    }

    return publicError;
  }

  private translateMessage(language: string | undefined, errorData: ApiErrorObject, originalError?: ApiException): TranslateMessageResult {
    let message: string;

    try {
      message = getMessage(language, errorData.message, errorData.values);
    } catch (error) {
      // prevents infinite loop if the translation fails everytime
      if (this.translationFailed) {
        throw originalError;
      }

      console.log('Translation error:', error)
      this.translationFailed = true;
      return { error };
    }

    this.translationFailed = false;
    return { message };
  }
  //#endregion
}

type TranslateMessageResult = { message: string } | { error: any };

class Response extends HttpResponse {

  readonly statusCode: number;
  readonly statusMessage: string;
  readonly code: string;


  constructor(data: { status: number, message: string, code: string }) {
    super(data);

    this.statusCode = data.status;
    this.statusMessage = data.message;
    this.code = data.code;
  }
}
