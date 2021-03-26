import { DownloadedAudio, Downloader } from 'types-pkg';
import { ParsedSpotifyUrl } from './types';
export declare class SpotifyElement implements Downloader {
    element: Downloader;
    constructor(data: ParsedSpotifyUrl);
    downloadAudio(): Promise<DownloadedAudio | DownloadedAudio[]>;
}
//# sourceMappingURL=SpotifyElement.d.ts.map