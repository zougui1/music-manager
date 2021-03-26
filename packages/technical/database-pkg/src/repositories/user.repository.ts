import { EntityRepository } from 'typeorm';

import { BaseRepository } from './base.repository';
import { UserEntity } from '../entities';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.findOne({ email });
  }
}
