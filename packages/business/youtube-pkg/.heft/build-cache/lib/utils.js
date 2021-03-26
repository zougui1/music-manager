"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYoutubeId = exports.getThumbnailUrl = exports.getYoutubeUrl = void 0;
//const reYoutubeUrl = /(?:youtube\.com\/([^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
const reYoutubeId = /(?:youtube\.com\/watch\?v=([^"&?\/\s]{11})|(?:youtu\.be\/[^"&?\/\s]{11}))/i;
const getYoutubeUrl = (url) => {
    return url.startsWith('http')
        ? url
        : `https://youtu.be/${url}`;
};
exports.getYoutubeUrl = getYoutubeUrl;
const getThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
};
exports.getThumbnailUrl = getThumbnailUrl;
const getYoutubeId = (urlOrId) => {
    const url = exports.getYoutubeUrl(urlOrId);
    const videoIdMatch = url.match(reYoutubeId);
    if (!videoIdMatch) {
        return;
    }
    return videoIdMatch[1];
};
exports.getYoutubeId = getYoutubeId;
//# sourceMappingURL=utils.js.map