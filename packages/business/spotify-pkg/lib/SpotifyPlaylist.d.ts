import { DownloadedAudio, Downloader } from 'types-pkg';
import { SpotifyApi } from './SpotifyApi';
import { SpotifyTrack } from './SpotifyTrack';
import { ParsedSpotifyUrl } from './types';
export declare class SpotifyPlaylist implements Downloader {
    tracks: SpotifyTrack[];
    url: string;
    id: string;
    api: SpotifyApi;
    constructor(data: ParsedSpotifyUrl);
    downloadAudio(): Promise<DownloadedAudio[]>;
}
//# sourceMappingURL=SpotifyPlaylist.d.ts.map