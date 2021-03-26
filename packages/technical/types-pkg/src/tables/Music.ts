import { BaseTable } from './BaseTable';

export interface Music extends BaseTable {
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
}

export interface MusicSource {
  youtube?: string;
  spotify?: string;
}
