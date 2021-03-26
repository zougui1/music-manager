import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { PlaylistToMusicEntity } from './playlist-to-music.entity';
export declare class PlaylistEntity extends BaseEntity {
    name: string;
    order: number;
    playlistToMusics: PlaylistToMusicEntity[];
    user: UserEntity;
}
//# sourceMappingURL=playlist.entity.d.ts.map