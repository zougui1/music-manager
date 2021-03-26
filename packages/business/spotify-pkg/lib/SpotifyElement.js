"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyElement = void 0;
const data_1 = require("./data");
const errors_1 = require("./errors");
const SpotifyTrack_1 = require("./SpotifyTrack");
const SpotifyPlaylist_1 = require("./SpotifyPlaylist");
class SpotifyElement {
    constructor(data) {
        switch (data.type) {
            case data_1.UrlType.track:
                this.element = new SpotifyTrack_1.SpotifyTrack(data);
                break;
            case data_1.UrlType.playlist:
                this.element = new SpotifyPlaylist_1.SpotifyPlaylist(data);
                break;
            default:
                throw new errors_1.SpotifyUnhandledTypeError();
        }
    }
    async downloadAudio() {
        return await this.element.downloadAudio();
    }
}
exports.SpotifyElement = SpotifyElement;
//# sourceMappingURL=SpotifyElement.js.map