"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const core_1 = require("@foal/core");
const database_pkg_1 = require("database-pkg");
const error_pkg_1 = require("error-pkg");
const api_1 = require("./api");
const auth_1 = require("./auth");
const file_controller_1 = require("./file.controller");
const openApi_controller_1 = require("./openApi.controller");
const translations_1 = require("../translations");
const utils_1 = require("../utils");
const hooks_1 = require("../hooks");
// it is important that Cors gets called
// before HandleOptionsRequest since it
// ends the request
let AppController = class AppController {
    constructor() {
        this.subControllers = [
            core_1.controller('/files', file_controller_1.FileController),
            core_1.controller('/api', api_1.ApiController),
            core_1.controller('/swagger', openApi_controller_1.OpenApiController),
            core_1.controller('/auth', auth_1.AuthController),
        ];
        this.translationFailed = false;
        //#endregion
    }
    async init() {
        await database_pkg_1.createConnection();
    }
    handleError(error, ctx, originalError) {
        var _a;
        console.error(error);
        const { headers, path } = ctx.request;
        const language = (_a = headers['content-language']) === null || _a === void 0 ? void 0 : _a.split('-')[0];
        const errorValues = {
            route: path,
        };
        const sourceError = originalError !== null && originalError !== void 0 ? originalError : error;
        const errorData = this.getInternalError(error, errorValues);
        const translation = this.translateMessage(language, errorData, originalError);
        if ('error' in translation) {
            return this.handleError(translation.error, ctx, sourceError);
        }
        const data = { message: translation.message, path };
        const publicError = this.getPublicError(errorData, data, sourceError);
        return new Response(publicError);
    }
    //#region private
    getInternalError(error, errorValues) {
        if (error instanceof core_1.HttpResponse) {
            const body = error.body;
            error = Object.assign(Object.assign({}, utils_1.convertErrorDescriptionToCode(body.description)), { status: error.statusCode });
        }
        const apiError = error_pkg_1.ApiException.from(error, errorValues);
        return apiError.toObject();
    }
    getPublicError(errorData, data, sourceError) {
        var _a;
        const publicError = Object.assign(Object.assign({}, data), { status: errorData.status, code: errorData.code });
        if (core_1.Config.get('settings.debug', 'boolean') && sourceError instanceof Error) {
            publicError.stack = (_a = sourceError.stack) === null || _a === void 0 ? void 0 : _a.split('\n');
        }
        return publicError;
    }
    translateMessage(language, errorData, originalError) {
        let message;
        try {
            message = translations_1.getMessage(language, errorData.message, errorData.values);
        }
        catch (error) {
            // prevents infinite loop if the translation fails everytime
            if (this.translationFailed) {
                throw originalError;
            }
            this.translationFailed = true;
            return { error };
        }
        this.translationFailed = false;
        return { message };
    }
};
AppController = __decorate([
    hooks_1.Cors(),
    hooks_1.HandleOptionsRequest(),
    hooks_1.HandleErrorResponses()
], AppController);
exports.AppController = AppController;
class Response extends core_1.HttpResponse {
    constructor(data) {
        super(data);
        this.statusCode = data.status;
        this.statusMessage = data.message;
        this.code = data.code;
    }
}
//# sourceMappingURL=app.controller.js.map