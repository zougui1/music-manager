import { DownloadedAudio, Downloader } from 'types-pkg';
import { YoutubeSearch } from './YoutubeSearch';
import { SearchCriterias } from './types';
export declare class Youtube implements Downloader {
    static Search: typeof YoutubeSearch;
    static isYoutubeVideo(urlOrId?: string | undefined): boolean;
    static downloadMostCorrectAudio(criterias: SearchCriterias, options?: DownloadAudioOptions): Promise<DownloadedAudio | undefined>;
    static downloadMostCorrectAudioOrFail(criterias: SearchCriterias, options?: DownloadAudioOptions): Promise<DownloadedAudio>;
    private static _downloadAudio;
    private static _download;
    downloadAudio(urlOrId: string, options?: DownloadAudioOptions): Promise<DownloadedAudio>;
}
export interface DownloadAudioOptions {
    format?: 'mp3';
    withMetadata?: boolean | undefined;
    coverUrl?: string;
}
//# sourceMappingURL=Youtube.d.ts.map