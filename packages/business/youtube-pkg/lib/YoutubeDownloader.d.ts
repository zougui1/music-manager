/// <reference types="node" />
import { EventEmitter } from 'events';
import { downloadOptions, getInfoOptions } from 'ytdl-core';
import { DownloadedAudio } from 'types-pkg';
import { YoutubeVideo } from './YoutubeVideo';
export declare class YoutubeDownloader extends EventEmitter {
    quality: downloadOptions['quality'];
    format: string;
    progressTimeout: number;
    requestOptions: getInfoOptions['requestOptions'];
    allowWebm: boolean;
    constructor(options: IYoutubeDownloaderOptions);
    download(video: YoutubeVideo): Promise<DownloadedAudio>;
    private getStreamOptions;
    private waitResponse;
    private performDownload;
}
export interface YoutubeDownloader {
    on(event: 'progress', listener: (data: DownloadProgress) => void): this;
}
export interface DownloadedYoutube {
    videoId: string;
    file: string;
    youtubeUrl: string;
    videoTitle: string;
    artist: string;
    title: string;
    thumbnail: string;
    publishDate: string;
}
export interface IYoutubeDownloaderOptions {
    format: string;
    quality?: downloadOptions['quality'];
    progressTimeout?: number;
    allowWebm?: boolean;
    requestOptions?: getInfoOptions['requestOptions'];
    outputOptions?: string[];
}
export interface DownloadProgress {
    videoId: string;
    progress: {
        percentage: number;
        transferred: number;
        length: number;
        remaining: number;
        eta: number;
        runtime: number;
        delta: number;
        speed: number;
    };
}
//# sourceMappingURL=YoutubeDownloader.d.ts.map