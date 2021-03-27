import { RepositoryAccessor, MusicEntity, MusicRepository, DeepPartial } from 'database-pkg';
export declare class Music extends RepositoryAccessor<MusicRepository> {
    constructor();
    findMany(criteria: IFindManyCriteria): Promise<MusicEntity[]>;
    findById(id: number): Promise<MusicEntity | undefined>;
    create(music: DeepPartial<MusicEntity>): Promise<MusicEntity>;
    clear(): Promise<void>;
}
export interface IFindManyCriteria {
    user: {
        id: number;
    };
}
//# sourceMappingURL=Music.d.ts.map