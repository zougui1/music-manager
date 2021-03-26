import { DownloadedAudio, Downloader } from 'types-pkg';

import { UrlType } from './data';
import { SpotifyUnhandledTypeError } from './errors';
import { SpotifyTrack } from './SpotifyTrack';
import { SpotifyPlaylist } from './SpotifyPlaylist';
import { ParsedSpotifyUrl } from './types';

export class SpotifyElement implements Downloader {

  element: Downloader;

  constructor(data: ParsedSpotifyUrl) {
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
    return await (this.element as SpotifyTrack).downloadAudio();
  }
}
