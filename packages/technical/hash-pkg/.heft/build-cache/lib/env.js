"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HASH_LENGTH = exports.HASH_TIME_COST = exports.HASH_PARALLELISM = exports.HASH_MEMORY_COST = void 0;
const env_pkg_1 = __importDefault(require("env-pkg"));
exports.HASH_MEMORY_COST = env_pkg_1.default.get('HASH_MEMORY_COST').required().asIntPositive();
exports.HASH_PARALLELISM = env_pkg_1.default.get('HASH_PARALLELISM').required().asIntPositive();
exports.HASH_TIME_COST = env_pkg_1.default.get('HASH_TIME_COST').required().asIntPositive();
exports.HASH_LENGTH = env_pkg_1.default.get('HASH_LENGTH').required().asIntPositive();
//# sourceMappingURL=env.js.map