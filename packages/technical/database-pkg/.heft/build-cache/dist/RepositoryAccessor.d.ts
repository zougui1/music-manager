import { BaseEntity } from './entities';
import { BaseRepository } from './repositories';
import { ObjectType } from './typeorm';
export declare abstract class RepositoryAccessor<T extends BaseRepository<BaseEntity>> {
    private _objectRepository;
    private _repository;
    constructor(repo: ObjectType<T>);
    protected getRepo(): T;
}
//# sourceMappingURL=RepositoryAccessor.d.ts.map