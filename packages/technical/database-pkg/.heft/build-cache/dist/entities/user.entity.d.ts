import { BaseEntity } from './base.entity';
import { Music } from './music.entity';
import { Playlist } from './playlist.entity';
export declare class User extends BaseEntity {
    name: string;
    email: string;
    password?: string | undefined;
    playlists: Playlist[];
    musics: Music[];
    hashPassword(): Promise<void>;
}
//# sourceMappingURL=user.entity.d.ts.map