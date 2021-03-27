"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("../setup");
const database_pkg_1 = require("database-pkg");
const music_pkg_1 = require("music-pkg");
const playlist_pkg_1 = require("playlist-pkg");
const user_pkg_1 = require("user-pkg");
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
    await Promise.all([
        populateForUser('zougui@gmail.com', 'nopassword'),
    ]);
};
const populateForUser = async (email, password) => {
    const playlist = new playlist_pkg_1.Playlist();
    const userService = new user_pkg_1.User();
    const user = await userService.login(email, password);
    if (!user) {
        console.log(`user "${email}" not found`);
        return;
    }
    const playlistsData = [1, 2, 3, 4, 5].map(order => {
        return {
            name: `some ${order}`,
            user: { id: user.id },
        };
    });
    const playlists = [];
    for (const playlistData of playlistsData) {
        playlists.push(await playlist.create(playlistData));
    }
    await Promise.all([
        createUserMusics(user.id, playlists[0].id),
    ]);
};
const createUserMusics = async (userId, playlistId) => {
    const music = new music_pkg_1.Music();
    const playlist = new playlist_pkg_1.Playlist();
    const _music = await music.create({
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
        user: { id: userId },
    });
    await playlist.addMusic(playlistId, _music);
};
//# sourceMappingURL=populate.js.map