import { BaseTable } from './BaseTable';
import { Music } from './Music';

export interface MusicPlaying extends BaseTable {
  startedAt: Date;
  platform: string;
  steps: PlayingMusicStep[];
  music: Music;
}

export enum PlayingMusicStepType {
  pause,
  resume,
}

export interface PlayingMusicStep {
  type: PlayingMusicStepType;
  date: Date;
}
