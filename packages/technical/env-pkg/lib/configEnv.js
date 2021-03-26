"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
let configured = false;
const cwd = path_1.default.join(process.cwd(), 'config');
const config = (configDir = cwd) => {
    if (configured) {
        return;
    }
    configured = true;
    const { NODE_ENV } = process.env;
    const fileName = '.env';
    let suffix = '';
    switch (NODE_ENV) {
        case 'development':
            suffix = 'dev';
            break;
        case 'production':
            suffix = 'prod';
            break;
        default:
            if (NODE_ENV) {
                suffix = NODE_ENV;
            }
            else {
                suffix = 'dev';
            }
            break;
    }
    const envFileName = `${fileName}.${suffix}`;
    const commonEnvPath = path_1.default.join(configDir, fileName);
    const envPath = path_1.default.join(configDir, envFileName);
    dotenv_1.default.config({ path: envPath });
    dotenv_1.default.config({ path: commonEnvPath });
};
exports.config = config;
//# sourceMappingURL=configEnv.js.map