"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeSearch = void 0;
const yt_search_1 = __importDefault(require("yt-search"));
const YoutubeVideo_1 = require("./YoutubeVideo");
const getMostCorrectVideo_1 = require("./getMostCorrectVideo");
const youtubeBaseUrl = 'https://youtube.com';
const MINIMUM_VIDEO_CORRECTNESS = 50;
class YoutubeSearch {
    //#region public
    static async findVideoLink(search) {
        const result = await yt_search_1.default(search);
        const [topResult] = result.videos;
        const youtubeLink = this.buildUrl(topResult);
        return youtubeLink;
    }
    static async findVideos(search) {
        const result = await yt_search_1.default(search);
        const videos = result.videos.slice(0, 10).map(video => {
            video.url = this.buildUrl(video);
            return video;
        });
        return videos;
    }
    static async findMostCorrectVideo(criterias) {
        let mostCorrectVideo = undefined;
        for (const artist of criterias.artists) {
            const foundVideos = await this.findVideos(`${artist.name} ${criterias.title}`);
            const currentCriterias = {
                album: criterias.album,
                title: criterias.title,
                duration: criterias.duration,
                artist,
            };
            const videos = foundVideos.map(v => new YoutubeVideo_1.YoutubeVideo(v.url));
            const _mostCorrectVideo = await getMostCorrectVideo_1.getMostCorrectVideo(videos, currentCriterias);
            mostCorrectVideo = _mostCorrectVideo;
            if (_mostCorrectVideo.correctness >= MINIMUM_VIDEO_CORRECTNESS) {
                mostCorrectVideo = _mostCorrectVideo;
                break;
            }
            if (_mostCorrectVideo.correctness > mostCorrectVideo.correctness) {
                mostCorrectVideo = _mostCorrectVideo;
            }
        }
        return mostCorrectVideo;
    }
    //#endregion
    //#region private
    static buildUrl(topResult) {
        return topResult.url.includes(youtubeBaseUrl)
            ? topResult.url
            : youtubeBaseUrl + topResult.url;
    }
}
exports.YoutubeSearch = YoutubeSearch;
//# sourceMappingURL=YoutubeSearch.js.map