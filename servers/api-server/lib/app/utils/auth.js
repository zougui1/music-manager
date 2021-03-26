"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const core_1 = require("@foal/core");
const jwt_1 = require("@foal/jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const tokenExpirationInterval = core_1.Config.getOrThrow('settings.jwt.tokenExpirationInterval', 'string');
const generateToken = (user) => {
    return jsonwebtoken_1.sign({ email: user.email }, jwt_1.getSecretOrPrivateKey(), { expiresIn: tokenExpirationInterval });
};
exports.generateToken = generateToken;
//# sourceMappingURL=auth.js.map