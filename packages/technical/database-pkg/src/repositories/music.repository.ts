import { EntityRepository, In, Like, FindManyOptions, DeepPartial } from 'typeorm';
import { MusicStatus, Music as MusicTable } from 'types-pkg';

import { BaseRepository } from './base.repository';
import { MusicEntity } from '../entities';

@EntityRepository(MusicEntity)
export class MusicRepository extends BaseRepository<MusicEntity> {

  async findMany(criterias: MusicRepository.IFindManyOptions) {
    const query: FindManyOptions<MusicEntity> = {
      where: {
        user: { id: criterias.user.id },
        status: In(criterias.status),
      },
    };

    return this.find(query);
  }

  async updateBySource(source: MusicTable['source'], music: DeepPartial<MusicEntity>): Promise<void> {
    const sourceStr = JSON.stringify(source);

    await this
      .createQueryBuilder()
      .update(music)
      .where('source LIKE :source', { source: `%${sourceStr}%` })
      .execute();
  }
}

interface IFindManyOptions {

}

export namespace MusicRepository {
  export interface IFindManyOptions {
    user: {
      id: number,
    };
    status: MusicStatus[];
  }
}
