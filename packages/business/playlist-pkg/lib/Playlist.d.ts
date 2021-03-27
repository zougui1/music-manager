import { RepositoryAccessor, PlaylistEntity, PlaylistRepository, MusicEntity } from 'database-pkg';
export declare class Playlist extends RepositoryAccessor<PlaylistRepository> {
    constructor();
    findMany(options: IFindManyOptions): Promise<PlaylistEntity[]>;
    findById(id: number): Promise<PlaylistEntity | undefined>;
    update(target: IUpdateTarget, options: UpdateOptions): Promise<void>;
    create(playlist: {
        name: string;
        user: {
            id: number;
        };
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
export interface IFindManyOptions {
    user: {
        id: number;
    };
}
export interface IUpdateTarget {
    id: number;
    user: {
        id: number;
    };
}
export declare type UpdateOptions = IUpdateOrdersOptions;
export interface IUpdateOrdersOptions {
    from: number;
    to: number;
}
//# sourceMappingURL=Playlist.d.ts.map