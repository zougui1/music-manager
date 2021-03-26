import { RepositoryAccessor, PlaylistEntity, PlaylistRepository, MusicEntity } from 'database-pkg';
export declare class Playlist extends RepositoryAccessor<PlaylistRepository> {
    constructor();
    findMany(): Promise<PlaylistEntity[]>;
    findById(id: number): Promise<PlaylistEntity | undefined>;
    update(id: number, options: UpdateOptions): Promise<void>;
    create(playlist: {
        name: string;
    }): Promise<PlaylistEntity>;
    addMusic(playlistId: number, music: MusicEntity): Promise<void>;
    clear(): Promise<void>;
    private updateManyOrder;
    private decrementOrders;
    private incrementOrders;
    private updateOrder;
    private findManyByOrder;
    private findOneByOrder;
}
export declare type UpdateOptions = IUpdateOrdersOptions;
export interface IUpdateOrdersOptions {
    from: number;
    to: number;
}
//# sourceMappingURL=Playlist.d.ts.map