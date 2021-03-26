import { ObjectType } from 'typeorm';
import { BaseEntity } from './entities';
import { BaseRepository } from './repositories';
export declare const getCustomRepository: <TRepository extends BaseRepository<BaseEntity>>(repo: ObjectType<TRepository>) => TRepository;
export * from 'typeorm';
//# sourceMappingURL=typeorm.d.ts.map