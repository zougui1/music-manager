import { Repository } from 'typeorm';
import { BaseEntity } from '../entities';
export declare class BaseRepository<Entity extends BaseEntity> extends Repository<Entity> {
    deleteAll(): Promise<void>;
}
//# sourceMappingURL=base.repository.d.ts.map