"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnhandledErrorCodeError = void 0;
const utils_1 = require("@poppinss/utils");
const errors = {
    unhandledErrorCode: {
        messageCode: 'errors.unhandledErrorCode',
        status: 500,
        code: 'E_UNHANDLED_ERROR_CODE',
    },
};
class UnhandledErrorCodeError extends utils_1.Exception {
    constructor(messageCode, values) {
        super(messageCode || errors.unhandledErrorCode.messageCode, errors.unhandledErrorCode.status, errors.unhandledErrorCode.code);
        this.values = {};
        this.values = values !== null && values !== void 0 ? values : {};
    }
}
exports.UnhandledErrorCodeError = UnhandledErrorCodeError;
//# sourceMappingURL=errors.js.map