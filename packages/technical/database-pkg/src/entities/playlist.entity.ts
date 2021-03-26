import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { rules } from 'validation-pkg';

import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { PlaylistToMusicEntity } from './playlist-to-music.entity';

@Entity({ name: 'playlists' })
export class PlaylistEntity extends BaseEntity {

  @Column('varchar', { length: rules.playlist.name.maxLength })
  public name!: string;

  @Column('int', { unsigned: true })
  public order!: number;

  @OneToMany(() => PlaylistToMusicEntity, playlistToMusic => playlistToMusic.playlist)
  public playlistToMusics!: PlaylistToMusicEntity[];

  @ManyToOne(() => UserEntity, user => user.musics)
  public user!: UserEntity;
}
