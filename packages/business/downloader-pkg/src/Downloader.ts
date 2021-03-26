import { Youtube } from 'youtube-pkg';
import { Spotify } from 'spotify-pkg';
import { Downloader as IDownloader, DownloadedAudio } from 'types-pkg';
import * as musicMetadata from 'music-metadata-pkg';
import { toArray } from 'utils-pkg';

import { DownloaderInvalidUrlError } from './errors';

export class Downloader implements IDownloader{

  readonly urlOrId: string;
  readonly downloader: IDownloader;

  constructor(urlOrId: string) {
    this.urlOrId = urlOrId;

    if (Spotify.isSpotifyUrl(urlOrId)) {
      this.downloader = new Spotify();
    } else if (Youtube.isYoutubeVideo(urlOrId)) {
      this.downloader = new Youtube();
    } else {
      throw new DownloaderInvalidUrlError();
    }
  }

  async downloadAudio(): Promise<DownloadedAudio[]> {
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
