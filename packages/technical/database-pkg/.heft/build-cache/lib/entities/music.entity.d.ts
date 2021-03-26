import { Music } from 'types-pkg';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { PlaylistToMusicEntity } from './playlist-to-music.entity';
import { MusicPlayingEntity } from './music-playing.entity';
export declare class MusicEntity extends BaseEntity {
    title: string;
    link: string;
    artists?: string[];
    album?: string;
    source?: Music['source'];
    thumbnail?: string;
    tags: string[];
    duration: number;
    approved: boolean;
    correctness?: number;
    playlistToMusics: PlaylistToMusicEntity[];
    user: UserEntity;
    playings: MusicPlayingEntity[];
}
//# sourceMappingURL=music.entity.d.ts.map