import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { PlaylistToMusic } from './playlist-to-music.entity';
export declare class Playlist extends BaseEntity {
    name: string;
    order: number;
    playlistToMusics: PlaylistToMusic[];
    userId: number;
    user: User;
}
//# sourceMappingURL=playlist.entity.d.ts.map