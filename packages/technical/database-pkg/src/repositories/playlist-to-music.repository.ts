import { EntityRepository } from 'typeorm';

import { BaseRepository } from './base.repository';
import { PlaylistToMusicEntity } from '../entities';

@EntityRepository(PlaylistToMusicEntity)
export class PlaylistToMusicRepository extends BaseRepository<PlaylistToMusicEntity> {

}
