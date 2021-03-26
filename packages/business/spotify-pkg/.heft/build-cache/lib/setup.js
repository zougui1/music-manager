"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_SECRET = exports.CLIENT_ID = void 0;
const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret, } = process.env;
if (!clientId || !clientSecret) {
    throw new Error('The environment variables "SPOTIFY_CLIENT_ID" and "SPOTIFY_CLIENT_SECRET" are required.');
}
exports.CLIENT_ID = clientId;
exports.CLIENT_SECRET = clientSecret;
//# sourceMappingURL=setup.js.map