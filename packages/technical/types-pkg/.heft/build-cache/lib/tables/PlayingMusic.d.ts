import { BaseTable } from './BaseTable';
import { Music } from './Music';
export interface MusicPlaying extends BaseTable {
    startedAt: Date;
    platform: string;
    steps: PlayingMusicStep[];
    music: Music;
}
export declare enum PlayingMusicStepType {
    pause = 0,
    resume = 1
}
export interface PlayingMusicStep {
    type: PlayingMusicStepType;
    date: Date;
}
//# sourceMappingURL=PlayingMusic.d.ts.map