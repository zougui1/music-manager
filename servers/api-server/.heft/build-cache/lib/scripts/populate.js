"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("../setup");
const database_pkg_1 = require("database-pkg");
const music_pkg_1 = require("music-pkg");
//import { User } from 'user-pkg';
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
    //const user = new User();
    const playlist = new playlist_pkg_1.Playlist();
    await music.clear();
    await playlist.clear();
    //await user.clear();
};
const populateDatabase = async () => {
    const music = new music_pkg_1.Music();
    //const user = new User();
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
        /*user.signup({
          email: 'zougui@gmail.com',
          name: 'Zougui',
          password: 'nopassword',
        }),*/
        /*user.signup({
          email: 'duh@duh.duh',
          name: 'Duh',
          password: 'John Duh',
        }),*/
    ]);
};
//# sourceMappingURL=populate.js.map