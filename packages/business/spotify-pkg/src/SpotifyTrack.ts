import { EventEmitter } from 'events';
import { Youtube, SearchCriterias } from 'youtube-pkg';
import { mergeMusicMetadata } from 'music-metadata-pkg';
import {
  DownloadedAudio,
  DownloadType,
  Downloader,
  TrackDownloadProgress,
  MusicDownloadInit,
  MusicDownloadComplete,
  Music,
} from 'types-pkg';

import { SpotifyApi } from './SpotifyApi';
import { SpotifyNotFoundError } from './errors';
import { UrlType } from './data';
import { ParsedSpotifyUrl } from './types';

export class SpotifyTrack extends EventEmitter implements Downloader {

  url: string;
  id: string;
  api = new SpotifyApi();

  constructor(data: ParsedSpotifyUrl) {
    super();
    this.url = data.url;
    this.id = data.id;
  }

  //#region public
  async downloadAudio(): Promise<DownloadedAudio> {
    const track = await this.api.extractTrack(this.id);

    this.emit('download-init', {
      type: DownloadType.track,
      count: 1,
    });

    const criterias: SearchCriterias = {
      album: track.albumName,
      title: track.name,
      duration: track.duration,
      artists: track.artists.map(a => ({
        name: a,
        altNames: [],
      })),
    };

    const youtube = new Youtube();
    const source = { spotify: this.url };

    this.emit('music-init', source);

    youtube.on('progress', (progress) => {
      const spotifyProgress = {
        ...progress,
        track: {
          ...progress.track,
          title: track.name,
        },
      };

      this.emit('progress', spotifyProgress);
    });

    this.emit('music-download-start', source);
    let downloaded: DownloadedAudio | undefined = undefined;

    try {
      downloaded = await youtube.downloadMostCorrectAudio(criterias, { withMetadata: false });
    } catch (error) {
      this.emit('music-download-error', source);
      throw error;
    }

    if (!downloaded) {
      this.emit('music-download-error', source);
      throw new SpotifyNotFoundError(null, { type: UrlType.track });
    }

    const downloadedTrack = {
      ...downloaded,
      title: track.name,
      artists: track.artists,
      album: track.albumName,
      date: track.releaseDate,
      source: {
        ...downloaded.source,
        spotify: this.url,
      },
      approved: false,
    };

    try {
      downloadedTrack.cover = await mergeMusicMetadata(downloaded.file, track);
    } catch (error) {}

    this.emit('music-download-success', downloadedTrack);

    return downloadedTrack;
  }
  //#endregion
}

export interface SpotifyTrack {
  on(event: 'progress', listener: (data: TrackDownloadProgress) => void): this;
  on(event: 'downloaded', listener: (data: DownloadedAudio) => void): this;
  on(event: 'download-init', listener: (data: MusicDownloadInit) => void): this;
  on(event: 'music-init', listener: (data: Music['source']) => void): this;
  on(event: 'music-download-start', listener: (data: Music['source']) => void): this;
  on(event: 'music-download-success', listener: (data: Music['source']) => void): this;
  on(event: 'music-download-error', listener: (data: Music['source']) => void): this;
  on(event: 'download-complete', listener: (data: MusicDownloadComplete) => void): this;
}
