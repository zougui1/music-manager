"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = exports.readFile = exports.createWriteStream = exports.writeFile = exports.getAppPath = exports.getTempPath = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./env");
const utils_1 = require("./utils");
const getTempPath = (pathData) => {
    return path_1.default.join(env_1.TEMP_DIR, utils_1.getFileName(pathData));
};
exports.getTempPath = getTempPath;
const getAppPath = (pathData) => {
    return path_1.default.join(env_1.APP_DIR, utils_1.getFileName(pathData));
};
exports.getAppPath = getAppPath;
const writeFile = async (extension, data) => {
    const path = exports.getAppPath({ extension });
    await fs_extra_1.default.writeFile(path, data);
    return path;
};
exports.writeFile = writeFile;
const createWriteStream = (extension) => {
    const tempPath = exports.getTempPath({ extension });
    const stream = fs_extra_1.default.createWriteStream(tempPath);
    stream.on('finish', async () => {
        const appPath = exports.getAppPath({ extension });
        await fs_extra_1.default.move(tempPath, appPath);
        stream.emit('file-created', appPath);
    });
    stream.waitFinish = (listener) => {
        stream.on('file-created', (filePath) => {
            listener(filePath);
        });
    };
    return stream;
};
exports.createWriteStream = createWriteStream;
async function readFile(fileName, encoding) {
    const filePath = exports.getAppPath({ fileName });
    return encoding
        ? await fs_extra_1.default.readFile(filePath, encoding)
        : await fs_extra_1.default.readFile(filePath);
}
exports.readFile = readFile;
const fileExists = async (fileName) => {
    const filePath = exports.getAppPath({ fileName });
    return await fs_extra_1.default.pathExists(filePath);
};
exports.fileExists = fileExists;
//# sourceMappingURL=filesystem.js.map