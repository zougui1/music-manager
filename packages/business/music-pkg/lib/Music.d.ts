import { RepositoryAccessor, MusicEntity, MusicRepository, DeepPartial } from 'database-pkg';
import { Music as MusicTable, MusicStatus } from 'types-pkg';
export declare class Music extends RepositoryAccessor<MusicRepository> {
    constructor();
    findMany(criteria: IFindManyCriteria): Promise<MusicEntity[]>;
    findById(id: number): Promise<MusicEntity | undefined>;
    updateBySource(source: MusicTable['source'], music: DeepPartial<MusicEntity>): Promise<void>;
    create(music: DeepPartial<MusicEntity>[]): Promise<MusicEntity[]>;
    create(music: DeepPartial<MusicEntity>): Promise<MusicEntity>;
    clear(): Promise<void>;
}
export interface IFindManyCriteria {
    user: {
        id: number;
    };
    status?: MusicStatus | MusicStatus[];
}
//# sourceMappingURL=Music.d.ts.map