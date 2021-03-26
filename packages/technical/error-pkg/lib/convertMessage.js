"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMessage = void 0;
const errors_1 = require("./errors");
const convertMessage = (code) => {
    switch (code) {
        case 'E_ROUTE_NOT_FOUND':
            return 'errors.route.notFound';
        default:
            throw new errors_1.UnhandledErrorCodeError(null, { code });
    }
};
exports.convertMessage = convertMessage;
//# sourceMappingURL=convertMessage.js.map