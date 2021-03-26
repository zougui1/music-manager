import {
  getConnection,
  createConnection as typeormCreateConnection,
  ObjectType,
  DeepPartial,
  Connection,
  ConnectionOptions,
} from 'typeorm';
import path from 'path';

import { BaseEntity, MusicEntity, MusicPlayingEntity, PlaylistEntity, PlaylistToMusicEntity, UserEntity } from './entities';
import { BaseRepository } from './repositories';

export const getCustomRepository = <TRepository extends BaseRepository<BaseEntity>>(repo: ObjectType<TRepository>): TRepository => {
  const connection = getConnection();
  return connection.getCustomRepository(repo);
}

export const createConnection = async (): Promise<Connection> => {
  const configPath = path.join(process.cwd(), 'ormconfig.js');
  const config: ConnectionOptions = require(configPath);

  if (!config) {
    throw new Error('Database config not found.');
  }

  return await typeormCreateConnection({
    ...config,
    entities: [MusicEntity, MusicPlayingEntity, PlaylistEntity, PlaylistToMusicEntity, UserEntity],
  });
}

export { ObjectType, DeepPartial };
