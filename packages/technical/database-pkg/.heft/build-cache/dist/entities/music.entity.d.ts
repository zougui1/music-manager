import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { PlaylistToMusic } from './playlist-to-music.entity';
export declare class Music extends BaseEntity {
    title: string;
    link: string;
    artists?: string[];
    album?: string;
    source?: string;
    thumbnail?: string;
    tags: string[];
    duration: number;
    approved: boolean;
    correctness?: number;
    playlistToMusics: PlaylistToMusic[];
    userId: number;
    user: User;
}
//# sourceMappingURL=music.entity.d.ts.map