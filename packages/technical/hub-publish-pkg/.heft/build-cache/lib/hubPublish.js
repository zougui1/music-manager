"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hubPublish = void 0;
const got_1 = __importDefault(require("got"));
const querystring_1 = __importDefault(require("querystring"));
const env_1 = require("./env");
const getPublishToken_1 = require("./getPublishToken");
const hubPublish = ({ topic, data }, options) => {
    var _a, _b;
    const _options = options !== null && options !== void 0 ? options : {};
    (_a = _options.jwtKey) !== null && _a !== void 0 ? _a : (_options.jwtKey = env_1.PUBLISHER_JWT);
    const url = (_b = _options.hubUrl) !== null && _b !== void 0 ? _b : env_1.HUB_URL;
    const stringifiedData = stringifyData(data);
    const body = querystring_1.default.stringify({
        topic,
        data: stringifiedData,
    });
    return got_1.default.post(url, Object.assign(Object.assign({}, _options), { body, headers: processHeaders(topic, _options) }));
};
exports.hubPublish = hubPublish;
const stringifyData = (data) => {
    if (typeof data === 'object') {
        return JSON.stringify(data);
    }
    if (data !== undefined) {
        return data.toString();
    }
};
const processHeaders = (topic, options) => {
    var _a;
    const defaultHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const finalHeaders = Object.assign(Object.assign({}, defaultHeaders), ((_a = options.headers) !== null && _a !== void 0 ? _a : {}));
    if (options.bearer) {
        finalHeaders.Authorization = `Bearer ${options.bearer}`;
    }
    else if (options.jwtKey) {
        const bearer = getPublishToken_1.getPublishToken(topic, options.jwtKey);
        finalHeaders.Authorization = `Bearer ${bearer}`;
    }
    return finalHeaders;
};
//# sourceMappingURL=hubPublish.js.map