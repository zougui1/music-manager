import { DownloadType } from './DownloadType';

export interface TrackDownloadProgress {
  track: {
    id: string,
    title: string;
    url: string,
  };
  // https://github.com/freeall/progress-stream#usage
  progress: {
    percentage: number;
    transferred: number;
    length: number;
    remaining: number;
    eta: number;
    runtime: number;
    delta: number;
    speed: number;
  };
  type: DownloadType.track;
}

export interface PlaylistDownloadProgress {
  id: string;
  name: string;
  url: string;
  tracks: TrackDownloadProgress[];
  type: DownloadType.playlist;
  totalCount: number;
}

export type DownloadProgress = TrackDownloadProgress | PlaylistDownloadProgress;
export type FullDownloadProgress = { userId: number } & DownloadProgress;
