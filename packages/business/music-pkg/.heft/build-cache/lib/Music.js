"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
const database_pkg_1 = require("database-pkg");
class Music extends database_pkg_1.RepositoryAccessor {
    constructor() {
        super(database_pkg_1.MusicRepository);
    }
    //#region public
    async findMany(criteria) {
        return this.repo.find({ where: { user: { id: criteria.user.id } } });
    }
    async findById(id) {
        return this.repo.findOne(id);
    }
    async create(music) {
        return this.repo.create(music).save();
    }
    async clear() {
        await this.getRepo(database_pkg_1.MusicPlayingRepository).deleteAll();
        await this.repo.deleteAll();
    }
}
exports.Music = Music;
//# sourceMappingURL=Music.js.map