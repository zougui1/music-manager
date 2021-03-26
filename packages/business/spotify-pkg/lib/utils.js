"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYoutubeLink = exports.parseSpotifyUrl = exports.getSpotifyTrackUrl = void 0;
const data_1 = require("./data");
const youtube_pkg_1 = require("youtube-pkg");
const reSpotifyUrl = /^(?:https?:\/\/open.spotify.com\/(?:user\/spotify\/)?(playlist|track)\/|spotify:(?:user:spotify:)?(playlist|track):)([a-zA-Z0-9]+)(.*)$/i;
const reDash = /-/g;
const getSpotifyTrackUrl = (urlOrId) => {
    return urlOrId.startsWith('http')
        ? urlOrId
        : `https://open.spotify.com/track/${urlOrId}`;
};
exports.getSpotifyTrackUrl = getSpotifyTrackUrl;
const parseSpotifyUrl = (url) => {
    const match = url.match(reSpotifyUrl);
    if (!match) {
        return;
    }
    const dirtyType = match[1];
    const id = match[2] || match[3];
    const type = data_1.UrlType[dirtyType];
    if (!type || !id) {
        return;
    }
    return { type, id, url };
};
exports.parseSpotifyUrl = parseSpotifyUrl;
const getYoutubeLink = async (songName) => {
    try {
        return await youtube_pkg_1.Youtube.Search.findVideoLink(songName);
    }
    catch (_) {
        const cleanName = songName.replace(reDash, ' ');
        return await youtube_pkg_1.Youtube.Search.findVideoLink(cleanName);
    }
};
exports.getYoutubeLink = getYoutubeLink;
//# sourceMappingURL=utils.js.map