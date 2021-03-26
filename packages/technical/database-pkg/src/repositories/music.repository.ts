import { EntityRepository } from 'typeorm';

import { BaseRepository } from './base.repository';
import { MusicEntity } from '../entities';

@EntityRepository(MusicEntity)
export class MusicRepository extends BaseRepository<MusicEntity> {

}
