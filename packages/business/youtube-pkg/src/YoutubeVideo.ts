import ytdl, { videoInfo, downloadOptions } from 'ytdl-core';
import { Readable } from 'stream';
import got from 'got';

import { YoutubeInvalidUrlError, YoutubeVideoNotFoundError } from './errors';
import { getYoutubeUrl, getThumbnailUrl, getYoutubeId } from './utils';

export class YoutubeVideo {

  url: string;
  thumbnailUrl: string | undefined;
  id: string | undefined;
  info: videoInfo  | undefined;

  constructor(urlOrId: string) {
    this.url = getYoutubeUrl(urlOrId);
    this.id = getYoutubeId(this.url);

    if (this.id) {
      this.thumbnailUrl = getThumbnailUrl(this.id);
    }
  }

  //#region private
  private async exists(): Promise<boolean> {
    if (!this.thumbnailUrl) {
      return false;
    }

    try {
      await got.head(this.thumbnailUrl);
    } catch (error) {
      return false;
    }

    return true;
  }
  //#endregion

  //#region public
  async check(): Promise<IValidVideoData> {
    if (!this.id || !this.thumbnailUrl) {
      throw new YoutubeInvalidUrlError();
    }

    const exists = await this.exists();

    if (!exists) {
      throw new YoutubeVideoNotFoundError();
    }

    return {
      url: this.url,
      id: this.id,
      thumbnailUrl: this.thumbnailUrl,
    };
  }

  async getInfo(): Promise<videoInfo> {
    return this.info ??= await ytdl.getInfo(this.url);
  }

  async getVideoInfo(): Promise<VideoInfo> {
    const info = await this.getInfo();
    const videoTitle = info.videoDetails.title;
    let artist = 'Unknown';
    let title = 'Unknown';
    const publishDate = info.videoDetails.publishDate;

    if (videoTitle.indexOf('-') > -1) {
      let temp = videoTitle.split('-');

      if (temp.length >= 2) {
        artist = temp[0].trim();
        title = temp[1].trim();
      }
    } else {
      title = videoTitle;
    }

    const audioBitrates = info.formats
      .map(format => format.audioBitrate)
      .filter(audioBitrate => audioBitrate) as number[];

    const audioBitrate = Math.max(...audioBitrates);

    return {
      videoTitle,
      title,
      artist,
      thumbnail: this.thumbnailUrl as string,
      audioBitrate,
      publishDate,
      duration: +info.videoDetails.lengthSeconds,
      info,
    };
  }

  async download(options: downloadOptions): Promise<Readable> {
    const info = await this.getInfo();
    return ytdl.downloadFromInfo(info, options);
  }
  //#endregion
}

export interface IValidVideoData {
  url: string;
  thumbnailUrl: string;
  id: string;
}

export interface VideoInfo {
  videoTitle: string;
  title: string;
  artist: string;
  thumbnail: string;
  info: videoInfo;
  audioBitrate: number | undefined;
  publishDate: string;
  duration: number;
}
