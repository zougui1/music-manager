"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = void 0;
const uuid = __importStar(require("uuid"));
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
const reSanitize = /^(\.)|(\.{2,})|(\/)|(\?.*)?/g;
const withExtension = (fileName, extension) => {
    if (!extension) {
        return fileName;
    }
    const extName = extension.replace(reSanitize, '');
    return fileName + '.' + sanitize_filename_1.default(extName);
};
const getFileName = (pathData) => {
    var _a;
    return withExtension((_a = pathData.fileName) !== null && _a !== void 0 ? _a : uuid.v4(), pathData.extension);
};
exports.getFileName = getFileName;
//# sourceMappingURL=utils.js.map