import SpotifyWebApi from 'spotify-web-api-node';
import { UrlType } from './data';
import { Track, Playlist } from './types';
export declare class SpotifyApi extends SpotifyWebApi {
    constructor();
    extractTrack(trackId: string): Promise<Track>;
    extractPlaylist(playlistId: string): Promise<Playlist>;
    setup(): Promise<void>;
    extractionHandler<T>(extractor: () => Promise<T>, type: UrlType): Promise<T>;
    _extractTrack(trackId: string): Promise<Track>;
    _extractPlaylist(playlistId: string): Promise<Playlist>;
}
//# sourceMappingURL=SpotifyApi.d.ts.map