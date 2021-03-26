"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonexistentTranslationError = void 0;
const error_pkg_1 = require("error-pkg");
const errors = {
    nonexistentTranslation: {
        messageCode: 'errors.translations.nonexistent',
        code: 'E_NONEXISTENT_TRANSLATION',
        status: 500,
    },
};
class NonexistentTranslationError extends error_pkg_1.createError(errors.nonexistentTranslation) {
}
exports.NonexistentTranslationError = NonexistentTranslationError;
//# sourceMappingURL=errors.js.map