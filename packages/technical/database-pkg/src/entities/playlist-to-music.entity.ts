import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { MusicEntity } from './music.entity';
import { PlaylistEntity } from './playlist.entity';

@Entity({ name: 'playlist_to_musics' })
export class PlaylistToMusicEntity extends BaseEntity {

  @ManyToOne(() => PlaylistEntity, playlist => playlist.playlistToMusics, { onDelete: 'CASCADE' })
  public playlist!: PlaylistEntity;

  @ManyToOne(() => MusicEntity, music => music.playlistToMusics, { onDelete: 'CASCADE' })
  public music!: MusicEntity;

  @Column('int', { unsigned: true })
  public order!: number;
}
