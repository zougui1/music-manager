"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeDownloader = void 0;
const events_1 = require("events");
const ffmpeg_pkg_1 = require("ffmpeg-pkg");
const progress_stream_1 = __importDefault(require("progress-stream"));
const filesystem_pkg_1 = __importDefault(require("filesystem-pkg"));
class YoutubeDownloader extends events_1.EventEmitter {
    constructor(options) {
        var _a, _b, _c, _d;
        super();
        this.waitResponse = (stream) => {
            return new Promise((resolve) => {
                stream.on('response', resolve);
            });
        };
        this.format = options.format;
        this.quality = (_a = options.quality) !== null && _a !== void 0 ? _a : 'highest';
        this.progressTimeout = (_b = options.progressTimeout) !== null && _b !== void 0 ? _b : 100;
        this.requestOptions = (_c = options.requestOptions) !== null && _c !== void 0 ? _c : { maxRedirects: 5 };
        this.allowWebm = (_d = options.allowWebm) !== null && _d !== void 0 ? _d : false;
    }
    //#region public
    async download(video) {
        const videoId = video.id;
        const info = await video.getVideoInfo();
        const stream = await video.download(this.getStreamOptions());
        const output = filesystem_pkg_1.default.getAppPath({ extension: this.format });
        const response = await this.waitResponse(stream);
        const progressStream = progress_stream_1.default({
            length: Number(response.headers['content-length']),
            time: this.progressTimeout,
        });
        progressStream.on('progress', (progress) => {
            this.emit('progress', { videoId, progress });
        });
        await this.performDownload(stream.pipe(progressStream), {
            audioBitrate: 320,
            output,
        });
        return {
            videoId,
            file: output,
            artists: info.artist.split(', '),
            album: 'Unknown',
            videoTitle: info.videoTitle,
            title: info.title,
            thumbnail: info.thumbnail,
            publishDate: info.publishDate,
            date: info.publishDate,
            source: {
                youtube: video.url,
            },
            duration: info.duration,
        };
    }
    //#endregion
    //#region private
    getStreamOptions() {
        const streamOptions = {
            quality: this.quality,
            requestOptions: this.requestOptions
        };
        if (!this.allowWebm) {
            streamOptions.filter = format => format.container !== 'webm';
        }
        return streamOptions;
    }
    performDownload(stream, options) {
        return new Promise((resolve, reject) => {
            stream.on('error', reject);
            ffmpeg_pkg_1.ffmpeg(stream)
                .audioBitrate(options.audioBitrate)
                .withAudioCodec('libmp3lame')
                .format(this.format)
                .save(options.output)
                .on('error', reject)
                .on('end', resolve);
        });
    }
}
exports.YoutubeDownloader = YoutubeDownloader;
//# sourceMappingURL=YoutubeDownloader.js.map