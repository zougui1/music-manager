"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyTrack = void 0;
const youtube_pkg_1 = require("youtube-pkg");
const music_metadata_pkg_1 = require("music-metadata-pkg");
const SpotifyApi_1 = require("./SpotifyApi");
const errors_1 = require("./errors");
const data_1 = require("./data");
class SpotifyTrack {
    constructor(data) {
        this.api = new SpotifyApi_1.SpotifyApi();
        this.url = data.url;
        this.id = data.id;
    }
    //#region public
    async downloadAudio() {
        const track = await this.api.extractTrack(this.id);
        const criterias = {
            album: track.albumName,
            title: track.name,
            duration: track.duration,
            artists: track.artists.map(a => ({
                name: a,
                altNames: [],
            })),
        };
        const downloaded = await youtube_pkg_1.Youtube.downloadMostCorrectAudio(criterias, { withMetadata: false });
        if (!downloaded) {
            throw new errors_1.SpotifyNotFoundError(null, { type: data_1.UrlType.track });
        }
        const cover = await music_metadata_pkg_1.mergeMusicMetadata(downloaded.file, track);
        return Object.assign(Object.assign({}, downloaded), { title: track.name, artists: track.artists, album: track.albumName, date: track.releaseDate, cover, source: Object.assign(Object.assign({}, downloaded.source), { spotify: this.url }) });
    }
}
exports.SpotifyTrack = SpotifyTrack;
//# sourceMappingURL=SpotifyTrack.js.map