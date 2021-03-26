import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { rules } from 'validation-pkg';
import { Music } from 'types-pkg';

import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { PlaylistToMusicEntity } from './playlist-to-music.entity';
import { MusicPlayingEntity } from './music-playing.entity';

@Entity({ name: 'musics' })
export class MusicEntity extends BaseEntity {

  @Column('varchar', { length: rules.music.title.maxLength })
  public title!: string;

  @Column('varchar', { length: rules.music.link.maxLength })
  public link!: string;

  @Column('simple-array')
  public artists?: string[];

  @Column('varchar', { length: rules.music.album.maxLength })
  public album?: string;

  @Column('simple-json')
  public source?: Music['source'];

  @Column('varchar', { length: rules.music.thumbnail.maxLength })
  public thumbnail?: string;

  @Column('simple-array')
  public tags!: string[];

  @Column('float', { unsigned: true })
  public duration!: number;

  @Column('boolean')
  public approved!: boolean;

  @Column('float')
  public correctness?: number;

  @OneToMany(() => PlaylistToMusicEntity, playlistToMusic => playlistToMusic.playlist, { onDelete: 'CASCADE' })
  public playlistToMusics!: PlaylistToMusicEntity[];

  @ManyToOne(() => UserEntity, user => user.musics)
  public user!: UserEntity;

  @OneToMany(() => MusicPlayingEntity, musicPlaying => musicPlaying.music, { cascade: true })
  public playings!: MusicPlayingEntity[];
}
