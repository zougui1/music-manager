import { EventEmitter } from 'events';

import { DownloadedAudio } from './DownloadedAudio';
import { MusicDownloadInit, MusicDownloadComplete } from './downloadInfo';
import { DownloadProgress } from './progress';
import { Music } from '../tables';
export interface Downloader extends EventEmitter {
  downloadAudio(link: string): Promise<DownloadedAudio | DownloadedAudio[]>;
  on(event: 'progress', listener: (data: DownloadProgress) => void): this;
  on(event: 'downloaded', listener: (data: DownloadedAudio) => void): this;
  on(event: 'download-init', listener: (data: MusicDownloadInit) => void): this;
  on(event: 'music-init', listener: (data: Music['source'] | Music['source'][]) => void): this;
  on(event: 'music-download-start', listener: (data: Music['source']) => void): this;
  on(event: 'music-download-success', listener: (data: DownloadedAudio) => void): this;
  on(event: 'music-download-error', listener: (data: Music['source']) => void): this;
  on(event: 'download-complete', listener: (data: MusicDownloadComplete) => void): this;
}
