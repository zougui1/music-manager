"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("../setup");
const database_pkg_1 = require("database-pkg");
const music_pkg_1 = require("music-pkg");
const playlist_pkg_1 = require("playlist-pkg");
async function main(args) {
    const connection = await database_pkg_1.createConnection();
    try {
        await clearDatabase();
        await populateDatabase();
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await connection.close();
    }
}
exports.main = main;
const clearDatabase = async () => {
    const music = new music_pkg_1.Music();
    const playlist = new playlist_pkg_1.Playlist();
    await music.clear();
    await playlist.clear();
};
const populateDatabase = async () => {
    const music = new music_pkg_1.Music();
    await Promise.all([
        music.create({
            album: 'album',
            approved: false,
            artists: ['dArtagnan'],
            correctness: 45,
            duration: 45,
            link: 'http://some.fo',
            source: {},
            tags: [],
            thumbnail: 'http://some.fo',
            title: 'Title',
        }),
    ]);
};
//# sourceMappingURL=populate.js.map