import { DownloadedAudio, Downloader } from 'types-pkg';
import { SpotifyApi } from './SpotifyApi';
import { ParsedSpotifyUrl } from './types';
export declare class SpotifyTrack implements Downloader {
    url: string;
    id: string;
    api: SpotifyApi;
    constructor(data: ParsedSpotifyUrl);
    downloadAudio(): Promise<DownloadedAudio>;
}
//# sourceMappingURL=SpotifyTrack.d.ts.map