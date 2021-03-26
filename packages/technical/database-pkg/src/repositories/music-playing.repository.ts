import { EntityRepository } from 'typeorm';

import { BaseRepository } from './base.repository';
import { MusicPlayingEntity } from '../entities';

@EntityRepository(MusicPlayingEntity)
export class MusicPlayingRepository extends BaseRepository<MusicPlayingEntity> {

}
