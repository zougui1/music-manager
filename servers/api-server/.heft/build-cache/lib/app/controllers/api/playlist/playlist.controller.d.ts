import { Context, HttpResponse } from '@foal/core';
import { Playlist, UpdateOptions } from 'playlist-pkg';
import { UserContext } from '../../../types';
export declare class PlaylistController {
    playlist: Playlist;
    find(ctx: Context<UserContext>): Promise<HttpResponse>;
    findOne(ctx: Context, { id }: {
        id: number;
    }): Promise<HttpResponse>;
    add(ctx: Context<UserContext>): Promise<HttpResponse>;
    opt(): Promise<HttpResponse>;
    update(ctx: Context, { id }: {
        id: number;
    }, body: UpdateOptions): Promise<HttpResponse>;
    optById(): Promise<HttpResponse>;
}
//# sourceMappingURL=playlist.controller.d.ts.map