import { DownloadedAudio } from './DownloadedAudio';

export interface Downloader {
  downloadAudio(link: string): Promise<DownloadedAudio | DownloadedAudio[]>;
}
