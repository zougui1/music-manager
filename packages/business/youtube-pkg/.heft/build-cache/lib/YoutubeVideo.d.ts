/// <reference types="node" />
import { videoInfo, downloadOptions } from 'ytdl-core';
import { Readable } from 'stream';
export declare class YoutubeVideo {
    url: string;
    thumbnailUrl: string | undefined;
    id: string | undefined;
    info: videoInfo | undefined;
    constructor(urlOrId: string);
    private exists;
    check(): Promise<IValidVideoData>;
    getInfo(): Promise<videoInfo>;
    getVideoInfo(): Promise<VideoInfo>;
    download(options: downloadOptions): Promise<Readable>;
}
export interface IValidVideoData {
    url: string;
    thumbnailUrl: string;
    id: string;
}
export interface VideoInfo {
    videoTitle: string;
    title: string;
    artist: string;
    thumbnail: string;
    info: videoInfo;
    audioBitrate: number | undefined;
    publishDate: string;
    duration: number;
}
//# sourceMappingURL=YoutubeVideo.d.ts.map