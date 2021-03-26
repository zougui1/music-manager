import { UrlType } from './data';

export interface ParsedSpotifyUrl {
  type: UrlType;
  url: string;
  id: string;
}

export interface Track {
  name: string;
  artists: string[];
  albumName: string;
  releaseDate: string;
  coverUrl: string;
  duration: number;
}

export interface Playlist {
  name: string;
  totalTracks: number;
  tracks: string[];
}
