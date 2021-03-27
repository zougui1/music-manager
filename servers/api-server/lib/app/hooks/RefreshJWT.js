"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshJWT = void 0;
const core_1 = require("@foal/core");
const utils_1 = require("../utils");
const RefreshJWT = () => {
    return core_1.Hook(ctx => {
        if (!ctx.user) {
            return;
        }
        return async (response) => {
            if (core_1.isHttpResponseServerError(response)) {
                return;
            }
            const newToken = utils_1.generateToken(ctx.user);
            let exposedHeaders = ['Access-Token'];
            const originalExposedHeaders = response.getHeader('Access-Control.Expose-Headers');
            if (originalExposedHeaders) {
                exposedHeaders = exposedHeaders.concat(originalExposedHeaders.split(','));
            }
            response
                .setHeader('Access-Token', newToken)
                .setHeader('Access-Control-Expose-Headers', exposedHeaders.join(', '));
        };
    });
};
exports.RefreshJWT = RefreshJWT;
//# sourceMappingURL=RefreshJWT.js.map