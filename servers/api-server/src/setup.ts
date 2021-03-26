import { Config } from '@foal/core';

process.env.APP_DIR = Config.get('filesystem.appDir', 'string');
process.env.TEMP_DIR = Config.get('filesystem.tempDir', 'string');

process.env.SPOTIFY_CLIENT_ID = Config.get('spotify.clientId', 'string');
process.env.SPOTIFY_CLIENT_SECRET = Config.get('spotify.clientSecret', 'string');

process.env.HASH_VARIANT = Config.getOrThrow('hash.variant', 'string');
process.env.HASH_TIME_COST = Config.getOrThrow('hash.timeCost', 'number').toString();
process.env.HASH_MEMORY_COST = Config.getOrThrow('hash.memoryCost', 'number').toString();
process.env.HASH_PARALLELISM = Config.getOrThrow('hash.parallelism', 'number').toString();
process.env.HASH_LENGTH = Config.getOrThrow('hash.hashLength', 'number').toString();
