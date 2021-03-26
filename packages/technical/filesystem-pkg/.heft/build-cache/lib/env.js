"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_DIR = exports.TEMP_DIR = void 0;
const env_pkg_1 = __importDefault(require("env-pkg"));
exports.TEMP_DIR = env_pkg_1.default.get('TEMP_DIR').required().asString();
exports.APP_DIR = env_pkg_1.default.get('APP_DIR').required().asString();
//# sourceMappingURL=env.js.map