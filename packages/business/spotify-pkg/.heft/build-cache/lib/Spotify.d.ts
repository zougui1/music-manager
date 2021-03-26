import { DownloadedAudio, Downloader } from 'types-pkg';
export declare class Spotify implements Downloader {
    static isSpotifyUrl(url?: string | undefined): boolean;
    downloadAudio(url: string): Promise<DownloadedAudio | DownloadedAudio[]>;
    private getElement;
}
//# sourceMappingURL=Spotify.d.ts.map