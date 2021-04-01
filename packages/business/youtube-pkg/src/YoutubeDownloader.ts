import { EventEmitter } from 'events';
import { ffmpeg } from 'ffmpeg-pkg';
import { downloadOptions, getInfoOptions } from 'ytdl-core';
import progress from 'progress-stream';
import fs from 'filesystem-pkg';
import { Readable } from 'stream';
import { DownloadedAudio, TrackDownloadProgress, DownloadType } from 'types-pkg';

import { YoutubeVideo } from './YoutubeVideo';

export class YoutubeDownloader extends EventEmitter {

  quality: downloadOptions['quality'];
  format: string;
  progressTimeout: number;
  requestOptions: getInfoOptions['requestOptions'];
  allowWebm: boolean;

  constructor(options: IYoutubeDownloaderOptions) {
    super();

    this.format = options.format;
    this.quality = options.quality ?? 'highest';
    this.progressTimeout = options.progressTimeout ?? 80;
    this.requestOptions = options.requestOptions ?? { maxRedirects: 5 };
    this.allowWebm = options.allowWebm ?? false;
  }

  //#region public
  async download(video: YoutubeVideo): Promise<DownloadedAudio> {
    const videoId = video.id as string;
    const info = await video.getVideoInfo();
    const stream = await video.download(this.getStreamOptions());
    const output = fs.getAppPath({ extension: this.format });

    const response = await this.waitResponse(stream);

    const progressStream = progress({
      length: Number(response.headers['content-length']),
      time: this.progressTimeout,
    });

    progressStream.on('progress', (progress) => {
      const progression: TrackDownloadProgress = {
        type: DownloadType.track,
        track: {
          id: videoId,
          title: info.title,
          url: video.url,
        },
        progress,
      };
      this.emit('progress', progression);
    });

    await this.performDownload(stream.pipe(progressStream), {
      audioBitrate: 320,
      output,
    });

    return {
      videoId,
      file: output,
      artists: info.artist.split(', '),
      album: 'Unknown',
      videoTitle: info.videoTitle,
      title: info.title,
      thumbnail: info.thumbnail,
      publishDate: info.publishDate,
      date: info.publishDate,
      source: {
        youtube: video.url,
      },
      duration: info.duration,
      approved: true,
    };
  }
  //#endregion

  //#region private
  private getStreamOptions(): downloadOptions {
    const streamOptions: downloadOptions =  {
      quality: this.quality,
      requestOptions: this.requestOptions
    };

    if (!this.allowWebm) {
      streamOptions.filter = format => format.container !== 'webm';
    }

    return streamOptions;
  }

  private waitResponse = (stream: Readable): Promise<any> => {
    return new Promise<any>((resolve) => {
      stream.on('response', resolve);
    });
  }

  private performDownload(stream: Readable, options: DownloadOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      stream.on('error', reject);

      ffmpeg(stream)
        .audioBitrate(options.audioBitrate)
        .withAudioCodec('libmp3lame')
        .format(this.format)
        .save(options.output)
        .on('error', reject)
        .on('end', resolve);
    });
  }
  //#endregion
}

export interface YoutubeDownloader {
  on(event: 'progress', listener: (data: TrackDownloadProgress) => void): this;
}

export interface DownloadedYoutube {
  videoId: string;
  file: string;
  youtubeUrl: string;
  videoTitle: string;
  artist: string;
  title: string;
  thumbnail: string;
  publishDate: string;
}

export interface IYoutubeDownloaderOptions {
  format: string;
  // https://github.com/fent/node-ytdl-core/blob/0574df33f3382f3a825e4bef30f21e51cd78eafe/typings/index.d.ts#L7
  quality?: downloadOptions['quality'];
  progressTimeout?: number;
  allowWebm?: boolean;
  requestOptions?: getInfoOptions['requestOptions'];
  outputOptions?: string[];
}

interface DownloadOptions {
  audioBitrate: number;
  output: string;
}
