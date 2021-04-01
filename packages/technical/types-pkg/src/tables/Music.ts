import { BaseTable } from './BaseTable';

export enum MusicStatus {
  TO_DOWNLOAD = 'TO_DOWNLOAD',
  DOWNLOADING = 'DOWNLOADING',
  DOWNLOADED = 'DOWNLOADED',
  DOWNLOAD_ERROR = 'DOWNLOAD_ERROR',
}

export interface MusicSource {
  youtube?: string;
  spotify?: string;
}

interface DownloadedMusic {
  title: string;
  path: string;
  artists: string[];
  tags: string[];
  album: string;
  duration: number;
  source: MusicSource;
  correctness?: number;
  approved: boolean;
  thumbnail?: string;
  order: number;
  status: MusicStatus.DOWNLOADED;
}

interface DownloadingMusic extends BaseTable {
  title?: string;
  path?: string;
  artists?: string[];
  tags?: string[];
  album?: string;
  duration?: number;
  source: MusicSource;
  correctness?: number;
  approved?: boolean;
  thumbnail?: string;
  order: number;
  status: MusicStatus;
}

export type Music = DownloadedMusic | DownloadingMusic;
