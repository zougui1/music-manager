"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
const database_pkg_1 = require("database-pkg");
const utils_pkg_1 = require("utils-pkg");
const errors_1 = require("./errors");
class Playlist extends database_pkg_1.RepositoryAccessor {
    constructor() {
        super(database_pkg_1.PlaylistRepository);
    }
    //#region public
    async findMany() {
        return this.repo.find();
    }
    async findById(id) {
        return this.repo.findOne(id);
    }
    async update(id, options) {
        await this.updateManyOrder(options);
    }
    async create(playlist) {
        var _a;
        const lastPlaylist = await this.repo.findOne({ order: { order: 'DESC' } });
        const lastOrder = (_a = lastPlaylist === null || lastPlaylist === void 0 ? void 0 : lastPlaylist.order) !== null && _a !== void 0 ? _a : 0;
        const playlistData = Object.assign(Object.assign({}, playlist), { order: lastOrder + 1 });
        return await this.repo.create(playlistData).save();
    }
    async addMusic(playlistId, music) {
        const playlist = await this.repo.findOne(playlistId, { relations: ['playlistToMusics'] });
        if (!playlist) {
            throw new errors_1.PlaylistNotFoundError();
        }
        const lastOrder = Math.max(...playlist.playlistToMusics.map(p => p.order));
        const playlistToMusic = await database_pkg_1.PlaylistToMusicEntity
            .create({
            playlist,
            music,
            order: lastOrder + 1,
        })
            .save();
        playlist.playlistToMusics.push(playlistToMusic);
        await playlist.save();
    }
    async clear() {
        await this.getRepo(database_pkg_1.PlaylistToMusicRepository).deleteAll();
        await this.repo.deleteAll();
    }
    //#endregion
    //#region private
    //#region update order
    async updateManyOrder({ from, to }) {
        const playlist = await this.findOneByOrder(from);
        if (!playlist) {
            throw new errors_1.PlaylistNotFoundError();
        }
        if (from < to) {
            const playlists = await this.findManyByOrder(utils_pkg_1.range(from + 1, to));
            await this.decrementOrders(playlists);
        }
        else {
            const playlists = await this.findManyByOrder(utils_pkg_1.range(from + 1, to - 1));
            await this.incrementOrders(playlists);
        }
        await this.updateOrder(playlist.id, to);
    }
    async decrementOrders(playlists) {
        const updates = playlists.map(playlist => {
            return this.updateOrder(playlist.id, playlist.order - 1);
        });
        await Promise.all(updates);
    }
    async incrementOrders(playlists) {
        const updates = playlists.map(playlist => {
            return this.updateOrder(playlist.id, playlist.order + 1);
        });
        await Promise.all(updates);
    }
    async updateOrder(id, order) {
        await this.repo.update(id, { order });
    }
    //#endregion
    //#region get order
    async findManyByOrder(orders) {
        const gets = orders.map(order => this.findOneByOrder(order));
        const playlists = await Promise.all(gets);
        return playlists.filter(p => p);
    }
    async findOneByOrder(order) {
        return await this.repo.findOne({ order });
    }
}
exports.Playlist = Playlist;
//# sourceMappingURL=Playlist.js.map