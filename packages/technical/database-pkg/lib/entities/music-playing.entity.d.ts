import { MusicPlaying } from 'types-pkg';
import { BaseEntity } from './base.entity';
import { MusicEntity } from './music.entity';
export declare class MusicPlayingEntity extends BaseEntity {
    startedAt: Date;
    platform: string;
    steps: MusicPlaying['steps'];
    music: MusicEntity;
}
//# sourceMappingURL=music-playing.entity.d.ts.map