"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
const database_pkg_1 = require("database-pkg");
const utils_pkg_1 = require("utils-pkg");
const types_pkg_1 = require("types-pkg");
const errors_1 = require("./errors");
class Playlist extends database_pkg_1.RepositoryAccessor {
    constructor() {
        super(database_pkg_1.PlaylistRepository);
    }
    //#region public
    async findMany(options) {
        return this.repo.find({
            where: { user: { id: options.user.id } },
        });
    }
    async findById(id) {
        // TODO merge those 2 queries
        const playlist = await this.repo.findOne(id);
        if (!playlist) {
            return;
        }
        const playlistToMusics = await this
            .getRepo(database_pkg_1.PlaylistToMusicRepository)
            .findManyByPlaylist({
            playlist: { id: playlist.id },
            music: { status: types_pkg_1.MusicStatus.DOWNLOADED },
        });
        playlist.playlistToMusics = playlistToMusics;
        return playlist;
    }
    async update(target, options) {
        await this.updateManyOrder(target, options);
    }
    async create(playlist) {
        var _a;
        const lastPlaylist = await this.repo.findOne({ order: { order: 'DESC' } });
        const lastOrder = (_a = lastPlaylist === null || lastPlaylist === void 0 ? void 0 : lastPlaylist.order) !== null && _a !== void 0 ? _a : 0;
        const playlistData = Object.assign(Object.assign({}, playlist), { order: lastOrder + 1, userId: playlist.user.id });
        return await this.repo.create(playlistData).save();
    }
    async addMusic(playlistId, music) {
        const playlist = await this.repo.findOne(playlistId, { relations: ['playlistToMusics'] });
        if (!playlist) {
            throw new errors_1.PlaylistNotFoundError();
        }
        const orders = playlist.playlistToMusics
            .map(p => p.order)
            // enforce 0 to be the default value if `playlistToMusics` is empty
            .concat([0]);
        const lastOrder = Math.max(...orders);
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
        //await this.getRepo(PlaylistToMusicRepository).deleteAll();
        await this.repo.deleteAll();
    }
    //#endregion
    //#region private
    //#region update order
    async updateManyOrder(target, { from, to }) {
        const playlist = await this.repo.findOne({ id: target.id, user: { id: target.user.id } });
        if (!playlist) {
            throw new errors_1.PlaylistNotFoundError();
        }
        if (from < to) {
            const orders = utils_pkg_1.range(from + 1, to);
            const playlists = await this.findManyByOrder(orders);
            await this.decrementOrders(playlists);
        }
        else {
            const orders = utils_pkg_1.range(to, from);
            const playlists = await this.findManyByOrder(orders);
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