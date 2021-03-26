"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeMetadata = void 0;
const ffmetadata_1 = __importDefault(require("ffmetadata"));
const writeMetadata = (file, data) => {
    return new Promise((resolve, reject) => {
        ffmetadata_1.default.write(file, data, {}, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
exports.writeMetadata = writeMetadata;
//# sourceMappingURL=writeMetadata.js.map