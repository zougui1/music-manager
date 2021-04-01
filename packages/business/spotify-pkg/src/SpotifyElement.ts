import { EventEmitter } from 'events';
import {
  DownloadedAudio,
  Downloader,
  DownloadProgress,
  MusicDownloadInit,
  MusicDownloadComplete,
  Music,
} from 'types-pkg';

import { UrlType } from './data';
import { SpotifyUnhandledTypeError } from './errors';
import { SpotifyTrack } from './SpotifyTrack';
import { SpotifyPlaylist } from './SpotifyPlaylist';
import { ParsedSpotifyUrl } from './types';

export class SpotifyElement extends EventEmitter implements Downloader {

  element: Downloader;

  constructor(data: ParsedSpotifyUrl) {
    super();

    switch (data.type) {
      case UrlType.track:
        this.element = new SpotifyTrack(data);
        break;
      case UrlType.playlist:
        this.element = new SpotifyPlaylist(data);
        break;

      default:
        throw new SpotifyUnhandledTypeError();
    }
  }

  async downloadAudio(): Promise<DownloadedAudio | DownloadedAudio[]> {

    this.element.on('progress', (progress) => {
      this.emit('progress', progress);
    });

    this.element.on('downloaded', (downloaded) => {
      this.emit('downloaded', downloaded);
    });

    this.element.on('download-init', (downloadInit) => {
      this.emit('download-init', downloadInit);
    });

    this.element.on('music-init', (musicInit) => {
      this.emit('music-init', musicInit);
    });

    this.element.on('music-download-start', (source) => {
      this.emit('music-download-start', source);
    });

    this.element.on('music-download-success', (source) => {
      this.emit('music-download-success', source);
    });

    this.element.on('music-download-error', (source) => {
      this.emit('music-download-error', source);
    });

    return await (this.element as SpotifyTrack).downloadAudio();
  }
}

export interface SpotifyElement {
  on(event: 'downloaded', listener: (data: DownloadedAudio) => void): this;
  on(event: 'progress', listener: (data: DownloadProgress) => void): this;
  on(event: 'download-init', listener: (data: MusicDownloadInit) => void): this;
  on(event: 'music-init', listener: (data: Music['source']) => void): this;
  on(event: 'music-download-start', listener: (data: Music['source']) => void): this;
  on(event: 'music-download-success', listener: (data: Music['source']) => void): this;
  on(event: 'music-download-error', listener: (data: Music['source']) => void): this;
  on(event: 'download-complete', listener: (data: MusicDownloadComplete) => void): this;
}
