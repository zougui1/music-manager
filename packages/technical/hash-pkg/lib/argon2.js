"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.hash = void 0;
const argon2_1 = __importDefault(require("argon2"));
const env_1 = require("./env");
const hash = async (plainText) => {
    return argon2_1.default.hash(plainText, {
        memoryCost: env_1.HASH_MEMORY_COST,
        parallelism: env_1.HASH_PARALLELISM,
        hashLength: env_1.HASH_LENGTH,
        timeCost: env_1.HASH_TIME_COST,
    });
};
exports.hash = hash;
exports.verify = argon2_1.default.verify;
//# sourceMappingURL=argon2.js.map