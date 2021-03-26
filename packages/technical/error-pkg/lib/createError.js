"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const ApiException_1 = require("./ApiException");
function createError(errorData) {
    var _a;
    return _a = class ApiError extends ApiException_1.ApiException {
            constructor(messageCode, values) {
                var _a;
                super({
                    message: messageCode || errorData.messageCode,
                    status: errorData.status,
                    code: errorData.code,
                    values: Object.assign(Object.assign({}, ((_a = errorData.values) !== null && _a !== void 0 ? _a : {})), (values !== null && values !== void 0 ? values : {})),
                });
            }
        },
        _a.messageCode = errorData.messageCode,
        _a.status = errorData.status,
        _a.code = errorData.code,
        _a.defaultValues = errorData.values,
        _a;
}
exports.createError = createError;
//# sourceMappingURL=createError.js.map