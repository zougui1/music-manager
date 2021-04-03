import { EntityRepository, DeepPartial } from 'typeorm';
import _ from 'lodash';

import { BaseRepository } from './base.repository';
import { PlaylistToMusicEntity, PlaylistEntity } from '../entities';

const equalQuery = (options: { alias: string, name: string, value: any }): [string] | [string, any] => {
  const { alias, name, value } = options;

  if (value === null) {
    return [`${alias}.${name} IS NULL`];
  } else {
    return [`${alias}.${name} = :${name}`, { [name]: value }];
  }
}

@EntityRepository(PlaylistToMusicEntity)
export class PlaylistToMusicRepository extends BaseRepository<PlaylistToMusicEntity> {

  async findManyByPlaylist(playlistToMusic: DeepPartial<PlaylistToMusicEntity>): Promise<PlaylistToMusicEntity[]> {
    return await this
      .createQuery()
      .leftJoinAndSelect('music')
      .whereAll(playlistToMusic)
      .getMany();
  }
}
