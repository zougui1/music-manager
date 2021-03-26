"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Downloader = void 0;
const youtube_pkg_1 = require("youtube-pkg");
const spotify_pkg_1 = require("spotify-pkg");
const musicMetadata = __importStar(require("music-metadata-pkg"));
const utils_pkg_1 = require("utils-pkg");
const errors_1 = require("./errors");
class Downloader {
    constructor(urlOrId) {
        this.urlOrId = urlOrId;
        if (spotify_pkg_1.Spotify.isSpotifyUrl(urlOrId)) {
            this.downloader = new spotify_pkg_1.Spotify();
        }
        else if (youtube_pkg_1.Youtube.isYoutubeVideo(urlOrId)) {
            this.downloader = new youtube_pkg_1.Youtube();
        }
        else {
            throw new errors_1.DownloaderInvalidUrlError();
        }
    }
    async downloadAudio() {
        var _a;
        const downloaded = await this.downloader.downloadAudio(this.urlOrId);
        const downloadeds = utils_pkg_1.toArray(downloaded);
        const metadatas = [];
        for (const downloaded of downloadeds) {
            const metadata = await musicMetadata.parseFile(downloaded.file);
            metadatas.push(Object.assign(Object.assign({}, downloaded), { duration: (_a = metadata.format.duration) !== null && _a !== void 0 ? _a : 0 }));
        }
        return metadatas;
    }
}
exports.Downloader = Downloader;
//# sourceMappingURL=Downloader.js.map