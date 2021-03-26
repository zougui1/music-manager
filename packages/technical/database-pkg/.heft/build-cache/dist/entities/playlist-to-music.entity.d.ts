import { BaseEntity } from './base.entity';
import { Music } from './music.entity';
import { Playlist } from './playlist.entity';
export declare class PlaylistToMusic extends BaseEntity {
    playlistId: number;
    playlist: Playlist;
    musicId: number;
    music: Music;
    order: number;
}
//# sourceMappingURL=playlist-to-music.entity.d.ts.map