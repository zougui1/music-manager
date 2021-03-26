import { Repository } from 'typeorm';

import { BaseEntity } from '../entities';

export class BaseRepository<Entity extends BaseEntity> extends Repository<Entity> {
  public async deleteAll(): Promise<void> {
    await this.delete({});
  }
}
