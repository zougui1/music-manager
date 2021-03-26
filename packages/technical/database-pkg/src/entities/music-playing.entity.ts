import { Column, Entity, ManyToOne } from 'typeorm';
import   { MusicPlaying } from 'types-pkg';

import { BaseEntity } from './base.entity';
import { MusicEntity } from './music.entity';

@Entity({ name: 'music_playings' })
export class MusicPlayingEntity extends BaseEntity {

  @Column()
  public startedAt!: Date;

  @Column('varchar', { length: 255 })
  public platform!: string;

  @Column('simple-json')
  public steps!: MusicPlaying['steps'];

  @ManyToOne(() => MusicEntity, music => music.playings, { onDelete: 'CASCADE' })
  public music!: MusicEntity;
}
