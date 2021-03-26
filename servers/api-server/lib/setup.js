"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@foal/core");
process.env.APP_DIR = core_1.Config.get('filesystem.appDir', 'string');
process.env.TEMP_DIR = core_1.Config.get('filesystem.tempDir', 'string');
process.env.SPOTIFY_CLIENT_ID = core_1.Config.get('spotify.clientId', 'string');
process.env.SPOTIFY_CLIENT_SECRET = core_1.Config.get('spotify.clientSecret', 'string');
process.env.HASH_VARIANT = core_1.Config.getOrThrow('hash.variant', 'string');
process.env.HASH_TIME_COST = core_1.Config.getOrThrow('hash.timeCost', 'number').toString();
process.env.HASH_MEMORY_COST = core_1.Config.getOrThrow('hash.memoryCost', 'number').toString();
process.env.HASH_PARALLELISM = core_1.Config.getOrThrow('hash.parallelism', 'number').toString();
process.env.HASH_LENGTH = core_1.Config.getOrThrow('hash.hashLength', 'number').toString();
//# sourceMappingURL=setup.js.map