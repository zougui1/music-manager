import { DownloadType } from './DownloadType';
import { DownloadedAudio } from './DownloadedAudio';

export interface MusicDownloadInit {
  type: DownloadType;
  count: number;
}

export interface FullMusicDownloadInit extends MusicDownloadInit {
  userId: number;
}

export interface MusicDownloaded extends DownloadedAudio {
  userId: number;
}

export interface MusicDownloadComplete {
  type: DownloadType;
  url: string;
  userId: number;
}
