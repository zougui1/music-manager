import { BaseEntity } from './entities';
import { BaseRepository } from './repositories';
import { getCustomRepository, ObjectType } from './typeorm';

export abstract class RepositoryAccessor<T extends BaseRepository<BaseEntity>> {

  private _objectRepository: ObjectType<T>;
  private _repo: T | undefined;
  protected get repo(): T {
    return this._repo ??= this.getRepo(this._objectRepository);
  }

  public constructor(repo: ObjectType<T>) {
    this._objectRepository = repo;
  }

  protected getRepo<TRepo extends BaseRepository<BaseEntity>>(repo: ObjectType<TRepo>): TRepo {
    return getCustomRepository(repo);
  }
}
