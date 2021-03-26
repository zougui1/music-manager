export interface DownloadSource {
  youtube: string;
  spotify?: string | undefined;
}

export interface DownloadedAudio {
  videoId: string;
  file: string;
  videoTitle: string;
  album: string;
  artists: string[];
  title: string;
  thumbnail: string;
  publishDate: string;
  date: string;
  cover?: string | undefined;
  source: DownloadSource;
  duration: number;
  correctness?: number | undefined;
}
