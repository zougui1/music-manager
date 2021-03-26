"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubePool = void 0;
const utils_pkg_1 = require("utils-pkg");
class YoutubePool {
    constructor(videos, expectedData) {
        this.videos = [];
        const _videos = videos;
        for (const video of _videos) {
            video.correctness = 100;
        }
        this.videos = _videos;
        this.expectedData = expectedData;
    }
    matchArtist(source, artist) {
        const names = [artist.name, ...artist.altNames];
        return names.some(artistName => source.includes(artistName.toLowerCase()));
    }
    async matchAgainstExpectations(video) {
        var _a;
        const { videoDetails } = await video.getInfo();
        const videoTitle = videoDetails.title.toLowerCase();
        const videoKeywords = ((_a = videoDetails.keywords) !== null && _a !== void 0 ? _a : []).map(key => key.toLowerCase());
        const videoDuration = +videoDetails.lengthSeconds;
        const expectedAlbum = this.expectedData.album.toLowerCase();
        const expectedTitle = this.expectedData.title.toLowerCase();
        const expectedArtistNames = [this.expectedData.artist.name, ...this.expectedData.artist.altNames];
        const expectedMinDuration = Math.floor(this.expectedData.duration - YoutubePool.acceptedDurationOffset);
        const expectedMaxDuration = Math.floor(this.expectedData.duration + YoutubePool.acceptedDurationOffset);
        if (!videoTitle.includes(expectedAlbum)) {
            video.correctness -= 10;
        }
        if (!videoTitle.includes(expectedTitle)) {
            video.correctness -= 40;
        }
        if (!expectedArtistNames.some(artist => videoTitle.includes(artist.toLowerCase()))) {
            video.correctness -= 30;
        }
        if (!expectedArtistNames.some(artist => videoKeywords.includes(artist.toLowerCase()))) {
            video.correctness -= 50;
        }
        if (videoDetails.category.toLowerCase() !== 'music') {
            video.correctness -= 10;
        }
        if (!videoKeywords.includes(expectedAlbum)) {
            video.correctness -= 10;
        }
        if (!utils_pkg_1.isInRange(videoDuration, expectedMinDuration, expectedMaxDuration)) {
            video.correctness -= 10;
        }
    }
    async matchAll() {
        // make all the necessary requests in parallel
        // since their result is cached they can be called
        // again at no cost
        await Promise.all(this.videos.map(video => video.getInfo()));
        for (const video of this.videos) {
            await this.matchAgainstExpectations(video);
        }
    }
    async getMostCorrectVideo() {
        await this.matchAll();
        const sortedVideos = this.videos.sort((a, b) => b.correctness - a.correctness);
        return sortedVideos[0];
    }
}
exports.YoutubePool = YoutubePool;
YoutubePool.acceptedDurationOffset = 5;
//# sourceMappingURL=YoutubePool.js.map