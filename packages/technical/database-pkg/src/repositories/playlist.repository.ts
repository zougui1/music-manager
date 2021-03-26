import { EntityRepository } from 'typeorm';

import { BaseRepository } from './base.repository';
import { PlaylistEntity } from '../entities';

@EntityRepository(PlaylistEntity)
export class PlaylistRepository extends BaseRepository<PlaylistEntity> {

}
