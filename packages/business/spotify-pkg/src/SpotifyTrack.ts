import { Youtube, SearchCriterias } from 'youtube-pkg';
import { mergeMusicMetadata } from 'music-metadata-pkg';
import { DownloadedAudio, Downloader } from 'types-pkg';

import { SpotifyApi } from './SpotifyApi';
import { SpotifyNotFoundError } from './errors';
import { UrlType } from './data';
import { ParsedSpotifyUrl } from './types';

export class SpotifyTrack implements Downloader {

  url: string;
  id: string;
  api = new SpotifyApi();

  constructor(data: ParsedSpotifyUrl) {
    this.url = data.url;
    this.id = data.id;
  }

  //#region public
  async downloadAudio(): Promise<DownloadedAudio> {
    const track = await this.api.extractTrack(this.id);

    const criterias: SearchCriterias = {
      album: track.albumName,
      title: track.name,
      duration: track.duration,
      artists: track.artists.map(a => ({
        name: a,
        altNames: [],
      })),
    };

    const downloaded = await Youtube.downloadMostCorrectAudio(criterias, { withMetadata: false });

    if (!downloaded) {
      throw new SpotifyNotFoundError(null, { type: UrlType.track });
    }

    const cover = await mergeMusicMetadata(downloaded.file, track);

    return {
      ...downloaded,
      title: track.name,
      artists: track.artists,
      album: track.albumName,
      date: track.releaseDate,
      cover,
      source: {
        ...downloaded.source,
        spotify: this.url,
      },
    };
  }
  //#endregion
}
