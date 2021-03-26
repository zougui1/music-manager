import { Column, Entity, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { rules } from 'validation-pkg';
import { hash } from 'hash-pkg';

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

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword(): Promise<void> {
    if (this.password && !this.password.startsWith('$argon2')) {
      this.password = await hash(this.password);
    }
  }
}
