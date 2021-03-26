import { BaseRepository } from './base.repository';
import { User } from '../entities';
export declare class UserRepository extends BaseRepository<User> {
    findByEmail(email: string): Promise<User | undefined>;
}
//# sourceMappingURL=user.repository.d.ts.map