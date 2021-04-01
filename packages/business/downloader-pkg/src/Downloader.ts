import { EventEmitter } from 'events';
import { Youtube } from 'youtube-pkg';
import { Spotify } from 'spotify-pkg';
import { Downloader as IDownloader, DownloadedAudio, FullDownloadProgress, MusicStatus } from 'types-pkg';
import * as musicMetadata from 'music-metadata-pkg';
import { toArray } from 'utils-pkg';
import { notifyMusicDownloadProgress, notifyMusicDownloadInit, notifyMusicDownloaded } from 'notification-pkg';
import path from 'path';
import { Music } from 'music-pkg';
import { Playlist } from 'playlist-pkg';

import { DownloaderInvalidUrlError } from './errors';

export class Downloader extends EventEmitter {

  readonly urlOrId: string;
  readonly downloader: IDownloader;

  constructor(urlOrId: string) {
    super();

    this.urlOrId = urlOrId;
    const spotify = new Spotify();
    const youtube = new Youtube();

    if (spotify.isSpotifyUrl(urlOrId)) {
      this.downloader = spotify;
    } else if (youtube.isYoutubeVideo(urlOrId)) {
      this.downloader = youtube;
    } else {
      throw new DownloaderInvalidUrlError();
    }
  }

  async downloadAudio({ userId, playlistId }: IDownloadAudioOptions): Promise<DownloadedAudio[]> {
    const music = new Music();
    const playlist = new Playlist();

    this.downloader.on('download-init', downloadInit => {
      notifyMusicDownloadInit({
        ...downloadInit,
        userId,
      });
    });

    this.downloader.on('music-init', async (source) => {
      const sources = toArray(source);
      const musicsData = sources.map(source => ({
        source,
        status: MusicStatus.TO_DOWNLOAD,
        user: { id: userId },
      }));

      const createdMusics = await music.create(musicsData);

      if (playlistId) {
        for (const createdMusic of createdMusics) {
          await playlist.addMusic(playlistId, createdMusic);
        }
      }
    });

    this.downloader.on('music-download-start', async (source) => {
      await music.updateBySource(source, { status: MusicStatus.DOWNLOADING });
    });

    this.downloader.on('music-download-success', async (downloaded) => {
      const source = downloaded.source.spotify
        ? { spotify: downloaded.source.spotify }
        : { youtube: downloaded.source.youtube };

      console.log('downloaded!', downloaded)
      const metadata = await musicMetadata.parseFile(downloaded.file);
      console.log('music parsed')

      const musicFileName = path.basename(downloaded.file);
      const thumbnailFileName = downloaded.cover
        ? path.basename(downloaded.cover)
        : undefined;

      await music.updateBySource(source, {
        title: downloaded.title,
        link: `http://localhost:3333/files/${musicFileName}`,
        duration: metadata.format.duration ?? 0,
        artists: downloaded.artists,
        album: downloaded.album,
        source: downloaded.source,
        thumbnail: thumbnailFileName
          ? `http://localhost:3333/files/${thumbnailFileName}`
          : undefined,
        user: { id: userId },
        tags: [],
        approved: downloaded.approved,
        status: MusicStatus.DOWNLOADED,
      });
      console.log('music updated!')
    });

    this.downloader.on('music-download-error', async (source) => {
      await music.updateBySource(source, { status: MusicStatus.DOWNLOAD_ERROR });
    });

    this.downloader.on('progress', progress => {
      const fullProgress: FullDownloadProgress = {
        ...progress,
        userId,
      };

      notifyMusicDownloadProgress(fullProgress);
    });

    this.downloader.on('music-download-success', downloadedMusic => {
      notifyMusicDownloaded({
        ...downloadedMusic,
        userId,
      });
    });

    const downloaded = await this.downloader.downloadAudio(this.urlOrId);
    const downloadeds = toArray(downloaded);
    const metadatas: DownloadedAudio[] = [];

    for (const downloaded of downloadeds) {
      const metadata = await musicMetadata.parseFile(downloaded.file);
      metadatas.push({
        ...downloaded,
        duration: metadata.format.duration ?? 0,
      });
    }

    return metadatas;
  }
}

export interface IDownloadAudioOptions {
  userId: number;
  playlistId?: number | undefined;
}
