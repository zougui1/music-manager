import { DownloadedAudio, Downloader } from 'types-pkg';

import { SpotifyElement } from './SpotifyElement';
import { SpotifyInvalidUrlError } from './errors';
import { parseSpotifyUrl } from './utils';

export class Spotify implements Downloader {

  //#region static methods
  static isSpotifyUrl(url?: string | undefined): boolean {
    return !!url && !!parseSpotifyUrl(url);
  }
  //#endregion

  //#region public
  async downloadAudio(url: string): Promise<DownloadedAudio | DownloadedAudio[]> {
    return await this.getElement(url).downloadAudio();
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
