import { Column, Entity, OneToMany } from 'typeorm';
import { rules } from 'validation-pkg';

import { BaseEntity } from './base.entity';
import { MusicEntity } from './music.entity';
import { PlaylistEntity } from './playlist.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {

  @Column('varchar', { length: rules.user.name.maxLength })
  public name!: string;

  @Column('varchar', { length: rules.user.email.maxLength })
  public email!: string;

  @Column('varchar')
  public password?: string | undefined;

  @OneToMany(() => PlaylistEntity, playlist => playlist.user)
  public playlists!: PlaylistEntity[];

  @OneToMany(() => MusicEntity, music => music.user)
  public musics!: MusicEntity[];
}
