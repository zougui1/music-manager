import { ObjectType, DeepPartial, Connection } from 'typeorm';
import { BaseEntity } from './entities';
import { BaseRepository } from './repositories';
export declare const getCustomRepository: <TRepository extends BaseRepository<BaseEntity>>(repo: ObjectType<TRepository>) => TRepository;
export declare const createConnection: () => Promise<Connection>;
export { ObjectType, DeepPartial };
//# sourceMappingURL=typeorm.d.ts.map