"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyPlaylist = void 0;
const SpotifyApi_1 = require("./SpotifyApi");
const SpotifyTrack_1 = require("./SpotifyTrack");
const utils_1 = require("./utils");
class SpotifyPlaylist {
    constructor(data) {
        this.tracks = [];
        this.api = new SpotifyApi_1.SpotifyApi();
        this.url = data.url;
        this.id = data.id;
    }
    //#region public
    async downloadAudio() {
        const playlist = await this.api.extractPlaylist(this.id);
        const tracks = [];
        let i = 0;
        for (const track of playlist.tracks) {
            if (i++ !== 3) {
                continue;
            }
            const parsedUrl = utils_1.parseSpotifyUrl(utils_1.getSpotifyTrackUrl(track));
            console.log(track);
            // TODO handle correctly
            if (!parsedUrl) {
                throw new Error('Invalid URL');
            }
            const spotifyTrack = new SpotifyTrack_1.SpotifyTrack(parsedUrl);
            tracks.push(await spotifyTrack.downloadAudio());
        }
        return tracks;
    }
}
exports.SpotifyPlaylist = SpotifyPlaylist;
//# sourceMappingURL=SpotifyPlaylist.js.map