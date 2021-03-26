"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublishToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getPublishToken = (topic, key, options = {}) => {
    const payload = {
        mercure: { publish: [topic] },
    };
    const jwtOptions = Object.assign({ expiresIn: 60, noTimestamp: true }, options);
    return jsonwebtoken_1.default.sign(payload, key, jwtOptions);
};
exports.getPublishToken = getPublishToken;
//# sourceMappingURL=getPublishToken.js.map