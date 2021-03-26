"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const env_var_1 = __importDefault(require("env-var"));
const configEnv_1 = require("./configEnv");
__exportStar(require("env-var"), exports);
function get(varName) {
    configEnv_1.config();
    return varName
        ? env_var_1.default.get(varName)
        : env_var_1.default.get();
}
exports.get = get;
//# sourceMappingURL=envVar.js.map