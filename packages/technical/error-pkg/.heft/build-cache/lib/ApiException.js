"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
const utils_1 = require("@poppinss/utils");
const convertMessage_1 = require("./convertMessage");
class ApiException extends utils_1.Exception {
    constructor(error) {
        var _a, _b, _c, _d;
        super((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : ApiException.defaultMessage, (_b = error === null || error === void 0 ? void 0 : error.status) !== null && _b !== void 0 ? _b : ApiException.defaultStatus);
        this.values = {};
        // we don't give it to the `super` because `Exception`
        // prepends the code to the message which we don't want
        this.code = (_c = error === null || error === void 0 ? void 0 : error.code) !== null && _c !== void 0 ? _c : ApiException.defaultCode;
        this.values = (_d = error === null || error === void 0 ? void 0 : error.values) !== null && _d !== void 0 ? _d : {};
    }
    //#region public static methods
    static from(value, values) {
        var _a;
        if (!value) {
            return new ApiException({ values });
        }
        value.values = Object.assign(Object.assign({}, ((_a = value.values) !== null && _a !== void 0 ? _a : {})), (values !== null && values !== void 0 ? values : {}));
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
    static fromError(value) {
        if (value.status || value.code) {
            if (value.code) {
                value.message = convertMessage_1.convertMessage(value.code);
            }
            return new ApiException(value);
        }
        return new ApiException(value.message);
    }
    static fromErrorData(value) {
        if (value.status || value.code) {
            value.message = value.messageCode;
            return new ApiException(value);
        }
        return new ApiException(value.messageCode);
    }
    //#endregion
    //#region public
    toObject() {
        var _a;
        return {
            message: this.message,
            status: this.status,
            code: (_a = this.code) !== null && _a !== void 0 ? _a : ApiException.defaultCode,
            values: this.values,
        };
    }
}
exports.ApiException = ApiException;
ApiException.defaultMessage = 'E_UNKNOWN_ERROR';
ApiException.defaultStatus = 500;
ApiException.defaultCode = 'E_UNKNOWN_ERROR';
//# sourceMappingURL=ApiException.js.map