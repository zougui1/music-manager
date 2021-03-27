import { BaseEntity } from './base.entity';
import { MusicEntity } from './music.entity';
import { PlaylistEntity } from './playlist.entity';
export declare class UserEntity extends BaseEntity {
    name: string;
    email: string;
    password?: string | undefined;
    playlists: PlaylistEntity[];
    musics: MusicEntity[];
}
//# sourceMappingURL=user.entity.d.ts.map