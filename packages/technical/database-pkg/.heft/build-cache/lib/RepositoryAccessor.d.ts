import { BaseEntity } from './entities';
import { BaseRepository } from './repositories';
import { ObjectType } from './typeorm';
export declare abstract class RepositoryAccessor<T extends BaseRepository<BaseEntity>> {
    private _objectRepository;
    private _repo;
    protected get repo(): T;
    constructor(repo: ObjectType<T>);
    protected getRepo<TRepo extends BaseRepository<BaseEntity>>(repo: ObjectType<TRepo>): TRepo;
}
//# sourceMappingURL=RepositoryAccessor.d.ts.map