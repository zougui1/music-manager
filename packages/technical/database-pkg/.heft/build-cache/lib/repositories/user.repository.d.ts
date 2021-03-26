import { BaseRepository } from './base.repository';
import { UserEntity } from '../entities';
export declare class UserRepository extends BaseRepository<UserEntity> {
    findByEmail(email: string): Promise<UserEntity | undefined>;
}
//# sourceMappingURL=user.repository.d.ts.map