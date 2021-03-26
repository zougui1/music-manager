"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spotify = void 0;
const SpotifyElement_1 = require("./SpotifyElement");
const errors_1 = require("./errors");
const utils_1 = require("./utils");
class Spotify {
    //#region static methods
    static isSpotifyUrl(url) {
        return !!url && !!utils_1.parseSpotifyUrl(url);
    }
    //#endregion
    //#region public
    async downloadAudio(url) {
        return await this.getElement(url).downloadAudio();
    }
    //#endregion
    //#region private
    getElement(url) {
        const parsedUrl = utils_1.parseSpotifyUrl(url);
        if (!parsedUrl) {
            throw new errors_1.SpotifyInvalidUrlError();
        }
        return new SpotifyElement_1.SpotifyElement(parsedUrl);
    }
}
exports.Spotify = Spotify;
//# sourceMappingURL=Spotify.js.map