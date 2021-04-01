import { EventEmitter } from 'events';
import { DownloadedAudio, Downloader, MusicDownloadInit, MusicDownloadComplete } from 'types-pkg';

import { SpotifyElement } from './SpotifyElement';
import { SpotifyInvalidUrlError } from './errors';
import { parseSpotifyUrl } from './utils';

export class Spotify extends EventEmitter implements Downloader {

  //#region methods
  isSpotifyUrl(url?: string | undefined): boolean {
    return !!url && !!parseSpotifyUrl(url);
  }
  //#endregion

  //#region public
  async downloadAudio(url: string): Promise<DownloadedAudio | DownloadedAudio[]> {
    const element = this.getElement(url);

    element.on('progress', progress => {
      this.emit('progress', progress);
    });

    element.on('downloaded', downloaded => {
      this.emit('downloaded', downloaded);
    });

    element.on('download-init', downloadInit => {
      this.emit('download-init', downloadInit);
    });

    element.on('music-init', (musicInit) => {
      this.emit('music-init', musicInit);
    });

    element.on('music-download-start', (source) => {
      this.emit('music-download-start', source);
    });

    element.on('music-download-success', (source) => {
      this.emit('music-download-success', source);
    });

    element.on('music-download-error', (source) => {
      this.emit('music-download-error', source);
    });

    return await element.downloadAudio();
  }
  //#endregion

  //#region private
  private getElement(url: string): SpotifyElement {
    const parsedUrl = parseSpotifyUrl(url);

    if (!parsedUrl) {
      throw new SpotifyInvalidUrlError();
    }

    return new SpotifyElement(parsedUrl);
  }
  //#endregion
}
