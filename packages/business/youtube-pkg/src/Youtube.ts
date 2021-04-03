import { EventEmitter } from 'events';
import { mergeMusicMetadata } from 'music-metadata-pkg';
import {
  DownloadedAudio,
  Downloader,
  TrackDownloadProgress,
  MusicDownloadInit,
  MusicDownloadComplete,
  Music,
} from 'types-pkg';

import { YoutubeVideo } from './YoutubeVideo';
import { YoutubeSearch } from './YoutubeSearch';
import { YoutubeDownloader } from './YoutubeDownloader';
import { YoutubeVideoNotFoundError } from './errors';
import { getYoutubeId } from './utils';
import { SearchCriterias } from './types';

const defaultAudioFormat = 'mp3';

export class Youtube extends EventEmitter implements Downloader {

  static Search = YoutubeSearch;
  search = new YoutubeSearch();

  //#region public methods
  isYoutubeVideo(urlOrId?: string | undefined): boolean {
    return !!urlOrId && !!getYoutubeId(urlOrId);
  }

  async downloadMostCorrectAudio(criterias: SearchCriterias, options?: DownloadAudioOptions): Promise<DownloadedAudio | undefined> {
    const video = await this.search.findMostCorrectVideo(criterias);

    if (!video) {
      return;
    }

    const downloaded = await this._downloadAudio(video, options);
    downloaded.correctness = video.correctness;

    return downloaded;
  }

  async downloadMostCorrectAudioOrFail(criterias: SearchCriterias, options?: DownloadAudioOptions): Promise<DownloadedAudio> {
    const downloaded = await this.downloadMostCorrectAudio(criterias, options);

    if (!downloaded) {
      throw new YoutubeVideoNotFoundError();
    }

    return downloaded;
  }
  //#endregion

  //#region private methods
  private async _downloadAudio(video: YoutubeVideo, options?: DownloadAudioOptions): Promise<DownloadedAudio> {
    const _options = {
      withMetadata: options?.withMetadata ?? true,
      coverUrl: options?.coverUrl,
    };

    const source = { youtube: video.url };

    this.emit('music-init', source);
    this.emit('music-download-start', source);
    let downloaded: DownloadedAudio;

    try {
      downloaded = await this._download(video, {
        format: options?.format ?? defaultAudioFormat,
        quality: 'highestaudio'
      });
    } catch (error) {
      console.error('youtube-download-error', error);
      this.emit('music-download-error', source);
      throw error;
    }

    if (_options.withMetadata) {
      try {
        downloaded.cover = await mergeMusicMetadata(_options.coverUrl ?? downloaded.file, {
          artists: downloaded.artists,
          albumName: 'Unknown',
          name: downloaded.title,
          releaseDate: downloaded.publishDate,
          coverUrl: downloaded.thumbnail,
        });
      } catch (e) {
        console.error('youtube-merge-metadata-error', e);
      }
    }

    this.emit('music-download-success', downloaded);

    return downloaded;
  }

  private async _download(video: YoutubeVideo, options: DownloadOptions): Promise<DownloadedAudio> {
    const downloader = new YoutubeDownloader(options);

    downloader.on('progress', progress => {
      this.emit('progress', progress);
    });

    return await downloader.download(video);
  }
  //#endregion

  //#region public
  async downloadAudio(urlOrId: string, options?: DownloadAudioOptions): Promise<DownloadedAudio> {    const video = new YoutubeVideo(urlOrId);
    await video.check();

    return await this._downloadAudio(video, options);
  }
  //#endregion
}

export interface Youtube {
  /*on(event: 'progress', listener: (data: TrackDownloadProgress) => void): this;
  on(event: 'downloaded', listener: (data: DownloadedAudio) => void): this;
  on(event: 'download-init', listener: (data: MusicDownloadInit) => void): this;
  on(event: 'download-complete', listener: (data: MusicDownloadComplete) => void): this;*/

  on(event: 'progress', listener: (data: TrackDownloadProgress) => void): this;
  on(event: 'downloaded', listener: (data: DownloadedAudio) => void): this;
  on(event: 'download-init', listener: (data: MusicDownloadInit) => void): this;
  on(event: 'music-init', listener: (data: Music['source'] | Music['source'][]) => void): this;
  on(event: 'music-download-start', listener: (data: Music['source']) => void): this;
  on(event: 'music-download-success', listener: (data: DownloadedAudio) => void): this;
  on(event: 'music-download-error', listener: (data: Music['source']) => void): this;
  on(event: 'download-complete', listener: (data: MusicDownloadComplete) => void): this;
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
