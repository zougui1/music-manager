"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
const database_pkg_1 = require("database-pkg");
const types_pkg_1 = require("types-pkg");
const utils_pkg_1 = require("utils-pkg");
class Music extends database_pkg_1.RepositoryAccessor {
    constructor() {
        super(database_pkg_1.MusicRepository);
    }
    //#region public
    async findMany(criteria) {
        const statuses = utils_pkg_1.toFilledArray(criteria.status, types_pkg_1.MusicStatus.DOWNLOADED);
        return this.repo.findMany({
            user: { id: criteria.user.id },
            status: statuses,
        });
    }
    async findById(id) {
        return this.repo.findOne(id);
    }
    async updateBySource(source, music) {
        await this.repo.updateBySource(source, music);
    }
    async create(music) {
        if (Array.isArray(music)) {
            return await this.repo.save(music);
        }
        return await this.repo.save(music);
    }
    async clear() {
        await this.getRepo(database_pkg_1.MusicPlayingRepository).deleteAll();
        await this.repo.deleteAll();
    }
}
exports.Music = Music;
//# sourceMappingURL=Music.js.map