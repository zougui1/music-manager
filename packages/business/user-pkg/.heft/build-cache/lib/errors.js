"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectCredentialsError = void 0;
const error_pkg_1 = require("error-pkg");
const errors = {
    incorrectCredentials: {
        messageCode: 'errors.user.credentials.incorrect',
        status: 401,
        code: 'E_INCORRECT_CREDENTIAL',
    },
};
class IncorrectCredentialsError extends error_pkg_1.createError(errors.incorrectCredentials) {
}
exports.IncorrectCredentialsError = IncorrectCredentialsError;
//# sourceMappingURL=errors.js.map