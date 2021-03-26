"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = exports.getCustomRepository = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const entities_1 = require("./entities");
const getCustomRepository = (repo) => {
    const connection = typeorm_1.getConnection();
    return connection.getCustomRepository(repo);
};
exports.getCustomRepository = getCustomRepository;
const createConnection = async () => {
    const configPath = path_1.default.join(process.cwd(), 'ormconfig.js');
    const config = require(configPath);
    if (!config) {
        throw new Error('Database config not found.');
    }
    return await typeorm_1.createConnection(Object.assign(Object.assign({}, config), { entities: [entities_1.MusicEntity, entities_1.MusicPlayingEntity, entities_1.PlaylistEntity, entities_1.PlaylistToMusicEntity, entities_1.UserEntity] }));
};
exports.createConnection = createConnection;
//# sourceMappingURL=typeorm.js.map