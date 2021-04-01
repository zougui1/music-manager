import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { rules } from 'validation-pkg';
import { Music, MusicStatus } from 'types-pkg';

import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { PlaylistToMusicEntity } from './playlist-to-music.entity';
import { MusicPlayingEntity } from './music-playing.entity';

@Entity({ name: 'musics' })
export class MusicEntity extends BaseEntity {

  @Column('varchar', { length: rules.music.title.maxLength, nullable: true })
  public title?: string;

  @Column('varchar', { length: rules.music.link.maxLength, nullable: true })
  public link?: string;

  @Column('simple-array', { nullable: true })
  public artists?: string[];

  @Column('varchar', { length: rules.music.album.maxLength, nullable: true })
  public album?: string;

  @Column('simple-json')
  public source!: Music['source'];

  @Column('varchar', { length: rules.music.thumbnail.maxLength, nullable: true })
  public thumbnail?: string;

  @Column('simple-array', { nullable: true })
  public tags?: string[];

  @Column('float', { unsigned: true, nullable: true })
  public duration?: number;

  @Column('boolean', { nullable: true })
  public approved?: boolean;

  @Column('float', { nullable: true })
  public correctness?: number;

  @OneToMany(() => PlaylistToMusicEntity, playlistToMusic => playlistToMusic.playlist, { onDelete: 'CASCADE' })
  public playlistToMusics!: PlaylistToMusicEntity[];

  @ManyToOne(() => UserEntity, user => user.musics)
  public user!: UserEntity;

  @OneToMany(() => MusicPlayingEntity, musicPlaying => musicPlaying.music, { cascade: true })
  public playings!: MusicPlayingEntity[];

  @Column('varchar')
  public status!: MusicStatus;
}
