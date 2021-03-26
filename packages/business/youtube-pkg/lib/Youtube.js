"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Youtube = void 0;
const music_metadata_pkg_1 = require("music-metadata-pkg");
const notification_pkg_1 = require("notification-pkg");
const YoutubeVideo_1 = require("./YoutubeVideo");
const YoutubeSearch_1 = require("./YoutubeSearch");
const YoutubeDownloader_1 = require("./YoutubeDownloader");
const errors_1 = require("./errors");
const utils_1 = require("./utils");
const defaultAudioFormat = 'mp3';
class Youtube {
    //#region public static methods
    static isYoutubeVideo(urlOrId) {
        return !!urlOrId && !!utils_1.getYoutubeId(urlOrId);
    }
    static async downloadMostCorrectAudio(criterias, options) {
        const video = await this.Search.findMostCorrectVideo(criterias);
        if (!video) {
            return;
        }
        const downloaded = await Youtube._downloadAudio(video, options);
        downloaded.correctness = video.correctness;
        return downloaded;
    }
    static async downloadMostCorrectAudioOrFail(criterias, options) {
        const downloaded = await this.downloadMostCorrectAudio(criterias, options);
        if (!downloaded) {
            throw new errors_1.YoutubeVideoNotFoundError();
        }
        return downloaded;
    }
    //#endregion
    //#region private static methods
    static async _downloadAudio(video, options) {
        var _a, _b, _c;
        const _options = {
            withMetadata: (_a = options === null || options === void 0 ? void 0 : options.withMetadata) !== null && _a !== void 0 ? _a : true,
            coverUrl: options === null || options === void 0 ? void 0 : options.coverUrl,
        };
        const downloaded = await this._download(video, {
            format: (_b = options === null || options === void 0 ? void 0 : options.format) !== null && _b !== void 0 ? _b : defaultAudioFormat,
            quality: 'highestaudio'
        });
        if (_options.withMetadata) {
            downloaded.cover = await music_metadata_pkg_1.mergeMusicMetadata((_c = _options.coverUrl) !== null && _c !== void 0 ? _c : downloaded.file, {
                artists: downloaded.artists,
                albumName: 'Unknown',
                name: downloaded.title,
                releaseDate: downloaded.publishDate,
                coverUrl: downloaded.thumbnail,
            });
        }
        return downloaded;
    }
    static async _download(video, options) {
        const downloader = new YoutubeDownloader_1.YoutubeDownloader(options);
        downloader.on('progress', progress => {
            notification_pkg_1.notifyMusicDownloadProgress(progress);
        });
        return await downloader.download(video);
    }
    //#endregion
    //#region public
    async downloadAudio(urlOrId, options) {
        const video = new YoutubeVideo_1.YoutubeVideo(urlOrId);
        await video.check();
        return await Youtube._downloadAudio(video, options);
    }
}
exports.Youtube = Youtube;
Youtube.Search = YoutubeSearch_1.YoutubeSearch;
//# sourceMappingURL=Youtube.js.map