"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const env_1 = require("./env");
fs_extra_1.default.ensureDir(env_1.TEMP_DIR);
fs_extra_1.default.ensureDir(env_1.APP_DIR);
//# sourceMappingURL=setup.js.map