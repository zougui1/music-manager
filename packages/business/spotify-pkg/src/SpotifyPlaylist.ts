import { EventEmitter } from 'events';
import {
  DownloadedAudio,
  Downloader,
  TrackDownloadProgress,
  PlaylistDownloadProgress,
  DownloadType,
  MusicDownloadInit,
  MusicDownloadComplete,
  Music,
} from 'types-pkg';

import { SpotifyApi } from './SpotifyApi';
import { SpotifyTrack } from './SpotifyTrack';
import { ParsedSpotifyUrl } from './types';
import { parseSpotifyUrl, getSpotifyTrackUrl } from './utils';

export class SpotifyPlaylist extends EventEmitter implements Downloader {

  tracks: SpotifyTrack[] = [];
  url: string;
  id: string;
  api = new SpotifyApi();

  constructor(data: ParsedSpotifyUrl) {
    super();
    this.url = data.url;
    this.id = data.id;
  }

  //#region public
  async downloadAudio(): Promise<DownloadedAudio[]> {
    const playlist = await this.api.extractPlaylist(this.id);
    const tracks: DownloadedAudio[] = [];
    const tracksProgressMap = new Map<string, TrackDownloadProgress>();

    this.emit('download-init', {
      type: DownloadType.playlist,
      count: playlist.totalTracks,
    });

    const tracksUrl = playlist.tracks.map(track => parseSpotifyUrl(getSpotifyTrackUrl(track)));

    const tracksToInit = tracksUrl.filter(track => track) as { url: string }[];
    const inits = tracksToInit.map(track => ({ spotify: track.url }));
    this.emit('music-init', inits);

    for (const track of tracksUrl) {
      // TODO handle correctly
      if (!track) {
        throw new Error('Invalid URL');
      }

      const source = { spotify: track.url };
      const spotifyTrack = new SpotifyTrack(track);

      spotifyTrack.on('progress', (trackProgress) => {
        tracksProgressMap.set(trackProgress.track.url, trackProgress);

        const playlistProgress: PlaylistDownloadProgress = {
          id: this.id,
          url: this.url,
          name: playlist.name,
          type: DownloadType.playlist,
          tracks: Array.from(tracksProgressMap.values()),
          totalCount: playlist.totalTracks,
        };

        this.emit('progress', playlistProgress);
      });

      spotifyTrack.on('downloaded', downloaded => {
        this.emit('downloaded', downloaded);
      });

      this.emit('music-download-start', source);

      try {
        const downloadedTrack = await spotifyTrack.downloadAudio();
        tracks.push(downloadedTrack);
        this.emit('music-download-success', downloadedTrack);
      } catch (error) {
        this.emit('music-download-error', source);
      }
    }

    return tracks;
  }
  //#endregion
}

export interface SpotifyPlaylist {
  on(event: 'progress', listener: (data: PlaylistDownloadProgress) => void): this;
  on(event: 'downloaded', listener: (data: DownloadedAudio) => void): this;
  on(event: 'download-init', listener: (data: MusicDownloadInit) => void): this;
  on(event: 'music-init', listener: (data: Music['source']) => void): this;
  on(event: 'music-download-start', listener: (data: Music['source']) => void): this;
  on(event: 'music-download-success', listener: (data: DownloadedAudio) => void): this;
  on(event: 'music-download-error', listener: (data: Music['source']) => void): this;
  on(event: 'download-complete', listener: (data: MusicDownloadComplete) => void): this;
}
