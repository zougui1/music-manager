"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = void 0;
const flat_1 = __importDefault(require("flat"));
const en_1 = __importDefault(require("./en"));
const errors_1 = require("./errors");
const defaultLanguage = 'en';
const translations = {
    en: flat_1.default(en_1.default),
};
const getMessage = (language, key, values = {}) => {
    const translation = translations[language !== null && language !== void 0 ? language : defaultLanguage] || translations[defaultLanguage];
    console.log(translation);
    console.log(key);
    if (!(key in translation)) {
        throw new errors_1.NonexistentTranslationError(null, { translationKey: key });
    }
    let message = translation[key];
    for (const [name, value] of Object.entries(values)) {
        const regex = new RegExp(`\\{${name}\\}`, 'g');
        message = message.replace(regex, value);
    }
    return message;
};
exports.getMessage = getMessage;
//# sourceMappingURL=index.js.map