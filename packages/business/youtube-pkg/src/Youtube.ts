import { mergeMusicMetadata } from 'music-metadata-pkg';
import { DownloadedAudio, Downloader } from 'types-pkg';
import { notifyMusicDownloadProgress } from 'notification-pkg';

import { YoutubeVideo } from './YoutubeVideo';
import { YoutubeSearch } from './YoutubeSearch';
import { YoutubeDownloader } from './YoutubeDownloader';
import { YoutubeVideoNotFoundError } from './errors';
import { getYoutubeId } from './utils';
import { SearchCriterias } from './types';

const defaultAudioFormat = 'mp3';

export class Youtube implements Downloader {

  static Search = YoutubeSearch;

  //#region public static methods
  static isYoutubeVideo(urlOrId?: string | undefined): boolean {
    return !!urlOrId && !!getYoutubeId(urlOrId);
  }

  static async downloadMostCorrectAudio(criterias: SearchCriterias, options?: DownloadAudioOptions): Promise<DownloadedAudio | undefined> {
    const video = await this.Search.findMostCorrectVideo(criterias);

    if (!video) {
      return;
    }

    const downloaded = await Youtube._downloadAudio(video, options);
    downloaded.correctness = video.correctness;

    return downloaded;
  }

  static async downloadMostCorrectAudioOrFail(criterias: SearchCriterias, options?: DownloadAudioOptions): Promise<DownloadedAudio> {
    const downloaded = await this.downloadMostCorrectAudio(criterias, options);

    if (!downloaded) {
      throw new YoutubeVideoNotFoundError();
    }

    return downloaded;
  }
  //#endregion

  //#region private static methods
  private static async _downloadAudio(video: YoutubeVideo, options?: DownloadAudioOptions): Promise<DownloadedAudio> {
    const _options = {
      withMetadata: options?.withMetadata ?? true,
      coverUrl: options?.coverUrl,
    };

    const downloaded = await this._download(video, {
      format: options?.format ?? defaultAudioFormat,
      quality: 'highestaudio'
    });

    if (_options.withMetadata) {
      downloaded.cover = await mergeMusicMetadata(_options.coverUrl ?? downloaded.file, {
        artists: downloaded.artists,
        albumName: 'Unknown',
        name: downloaded.title,
        releaseDate: downloaded.publishDate,
        coverUrl: downloaded.thumbnail,
      });
    }

    return downloaded;
  }

  private static async _download(video: YoutubeVideo, options: DownloadOptions): Promise<DownloadedAudio> {
    const downloader = new YoutubeDownloader(options);

    downloader.on('progress', progress => {
      notifyMusicDownloadProgress(progress);
    });

    return await downloader.download(video);
  }
  //#endregion

  //#region public
  async downloadAudio(urlOrId: string, options?: DownloadAudioOptions): Promise<DownloadedAudio> {
    const video = new YoutubeVideo(urlOrId);
    await video.check();

    return await Youtube._downloadAudio(video, options);
  }
  //#endregion
}

interface DownloadOptions {
  format: 'mp3';
  quality: 'highestaudio';
}

export interface DownloadAudioOptions {
  format?: 'mp3';
  withMetadata?: boolean | undefined;
  coverUrl?: string;
}
