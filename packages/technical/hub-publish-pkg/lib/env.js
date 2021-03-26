"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLISHER_JWT = exports.HUB_URL = void 0;
const env_pkg_1 = __importDefault(require("env-pkg"));
exports.HUB_URL = env_pkg_1.default.get('MERCURE_URL').required().asUrlString();
exports.PUBLISHER_JWT = env_pkg_1.default.get('PUBLISHER_JWT').required().asString();
//# sourceMappingURL=env.js.map