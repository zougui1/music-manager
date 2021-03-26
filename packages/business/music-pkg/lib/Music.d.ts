import { RepositoryAccessor, MusicEntity, MusicRepository, DeepPartial } from 'database-pkg';
export declare class Music extends RepositoryAccessor<MusicRepository> {
    constructor();
    findMany(): Promise<MusicEntity[]>;
    findById(id: number): Promise<MusicEntity | undefined>;
    create(music: DeepPartial<MusicEntity>): Promise<MusicEntity>;
    clear(): Promise<void>;
}
//# sourceMappingURL=Music.d.ts.map