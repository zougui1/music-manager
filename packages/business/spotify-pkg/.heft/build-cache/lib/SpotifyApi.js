"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyApi = void 0;
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const setup_1 = require("./setup");
const errors_1 = require("./errors");
const data_1 = require("./data");
class SpotifyApi extends spotify_web_api_node_1.default {
    constructor() {
        super({ clientId: setup_1.CLIENT_ID, clientSecret: setup_1.CLIENT_SECRET });
    }
    //#region public
    async extractTrack(trackId) {
        return this.extractionHandler(() => this._extractTrack(trackId), data_1.UrlType.track);
    }
    async extractPlaylist(playlistId) {
        return this.extractionHandler(() => this._extractPlaylist(playlistId), data_1.UrlType.playlist);
    }
    //#endregion
    //#region private
    async setup() {
        const data = await this.clientCredentialsGrant();
        this.setAccessToken(data.body.access_token);
    }
    async extractionHandler(extractor, type) {
        var _a;
        try {
            return extractor();
        }
        catch (error) {
            switch ((_a = error.body) === null || _a === void 0 ? void 0 : _a.error.status) {
                case 404:
                    throw new errors_1.SpotifyNotFoundError(null, { type });
                case 400:
                    throw new errors_1.SpotifyInvalidUrlError();
                default:
                    throw new errors_1.SpotifyUnknownError();
            }
        }
    }
    async _extractTrack(trackId) {
        await this.setup();
        const data = await this.getTrack(trackId);
        const artists = data.body.artists.map(a => a.name);
        return {
            name: data.body.name,
            artists,
            albumName: data.body.album.name,
            releaseDate: data.body.album.release_date,
            coverUrl: data.body.album.images[0].url,
            duration: data.body.duration_ms / 1000,
        };
    }
    async _extractPlaylist(playlistId) {
        await this.setup();
        const data = await this.getPlaylist(playlistId);
        const details = {
            name: data.body.name,
            totalTracks: data.body.tracks.total,
            tracks: [],
        };
        const addItems = (items) => {
            for (const item of items) {
                details.tracks.push(item.track.id);
            }
        };
        if (data.body.tracks.next) {
            for (let offset = 0; details.tracks.length < details.totalTracks; offset += 100) {
                const playlistTracks = await this.getPlaylistTracks(playlistId, { limit: 100, offset });
                addItems(playlistTracks.body.items);
            }
        }
        else {
            addItems(data.body.tracks.items);
        }
        return details;
    }
}
exports.SpotifyApi = SpotifyApi;
//# sourceMappingURL=SpotifyApi.js.map