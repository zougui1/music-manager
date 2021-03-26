"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeVideo = void 0;
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const got_1 = __importDefault(require("got"));
const errors_1 = require("./errors");
const utils_1 = require("./utils");
class YoutubeVideo {
    constructor(urlOrId) {
        this.url = utils_1.getYoutubeUrl(urlOrId);
        this.id = utils_1.getYoutubeId(this.url);
        if (this.id) {
            this.thumbnailUrl = utils_1.getThumbnailUrl(this.id);
        }
    }
    //#region private
    async exists() {
        if (!this.thumbnailUrl) {
            return false;
        }
        try {
            await got_1.default.head(this.thumbnailUrl);
        }
        catch (error) {
            return false;
        }
        return true;
    }
    //#endregion
    //#region public
    async check() {
        if (!this.id || !this.thumbnailUrl) {
            throw new errors_1.YoutubeInvalidUrlError();
        }
        const exists = await this.exists();
        if (!exists) {
            throw new errors_1.YoutubeVideoNotFoundError();
        }
        return {
            url: this.url,
            id: this.id,
            thumbnailUrl: this.thumbnailUrl,
        };
    }
    async getInfo() {
        var _a;
        return (_a = this.info) !== null && _a !== void 0 ? _a : (this.info = await ytdl_core_1.default.getInfo(this.url));
    }
    async getVideoInfo() {
        const info = await this.getInfo();
        const videoTitle = info.videoDetails.title;
        let artist = 'Unknown';
        let title = 'Unknown';
        const publishDate = info.videoDetails.publishDate;
        if (videoTitle.indexOf('-') > -1) {
            let temp = videoTitle.split('-');
            if (temp.length >= 2) {
                artist = temp[0].trim();
                title = temp[1].trim();
            }
        }
        else {
            title = videoTitle;
        }
        const audioBitrates = info.formats
            .map(format => format.audioBitrate)
            .filter(audioBitrate => audioBitrate);
        const audioBitrate = Math.max(...audioBitrates);
        return {
            videoTitle,
            title,
            artist,
            thumbnail: this.thumbnailUrl,
            audioBitrate,
            publishDate,
            duration: +info.videoDetails.lengthSeconds,
            info,
        };
    }
    async download(options) {
        const info = await this.getInfo();
        return ytdl_core_1.default.downloadFromInfo(info, options);
    }
}
exports.YoutubeVideo = YoutubeVideo;
//# sourceMappingURL=YoutubeVideo.js.map