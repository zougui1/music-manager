import { RepositoryAccessor, PlaylistEntity, PlaylistRepository, MusicEntity, PlaylistToMusicEntity, PlaylistToMusicRepository } from 'database-pkg';
import { range } from 'utils-pkg';

import { PlaylistNotFoundError } from './errors';

export class Playlist extends RepositoryAccessor<PlaylistRepository> {

  constructor() {
    super(PlaylistRepository);
  }

  //#region public
  public async findMany(): Promise<PlaylistEntity[]> {
    return this.repo.find();
  }

  public async findById(id: number): Promise<PlaylistEntity | undefined> {
    return this.repo.findOne(id);
  }

  public async update(id: number, options: UpdateOptions): Promise<void> {
    await this.updateManyOrder(options);
  }

  public async create(playlist: { name: string }): Promise<PlaylistEntity> {
    const lastPlaylist = await this.repo.findOne({ order: { order: 'DESC' } });

    const lastOrder = lastPlaylist?.order ?? 0;
    const playlistData = {
      ...playlist,
      order: lastOrder + 1,
    };

    return await this.repo.create(playlistData).save();
  }

  public async addMusic(playlistId: number, music: MusicEntity): Promise<void> {
    const playlist = await this.repo.findOne(playlistId, { relations: ['playlistToMusics'] });

    if (!playlist) {
      throw new PlaylistNotFoundError();
    }

    const lastOrder = Math.max(...playlist.playlistToMusics.map(p => p.order));
    const playlistToMusic = await PlaylistToMusicEntity
      .create({
        playlist,
        music,
        order: lastOrder + 1,
      })
      .save();

    playlist.playlistToMusics.push(playlistToMusic);
    await playlist.save();
  }

  public async clear(): Promise<void> {
    await this.getRepo(PlaylistToMusicRepository).deleteAll();
    await this.repo.deleteAll();
  }
  //#endregion

  //#region private
  //#region update order
  private async updateManyOrder({ from, to }: IUpdateOrdersOptions): Promise<void> {
    const playlist = await this.findOneByOrder(from);

    if (!playlist) {
      throw new PlaylistNotFoundError();
    }

    if (from < to) {
      const playlists = await this.findManyByOrder(range(from + 1, to));
      await this.decrementOrders(playlists);
    } else {
      const playlists = await this.findManyByOrder(range(from + 1, to - 1));
      await this.incrementOrders(playlists);
    }

    await this.updateOrder(playlist.id, to);
  }

  private async decrementOrders(playlists: PlaylistEntity[]): Promise<void> {
    const updates = playlists.map(playlist => {
      return this.updateOrder(playlist.id, playlist.order - 1);
    });

    await Promise.all(updates);
  }

  private async incrementOrders(playlists: PlaylistEntity[]): Promise<void> {
    const updates = playlists.map(playlist => {
      return this.updateOrder(playlist.id, playlist.order + 1);
    });

    await Promise.all(updates);
  }

  private async updateOrder(id: number, order: number): Promise<void> {
    await this.repo.update(id, { order });
  }
  //#endregion

  //#region get order
  private async findManyByOrder(orders: number[]): Promise<PlaylistEntity[]> {
    const gets = orders.map(order => this.findOneByOrder(order));
    const playlists = await Promise.all(gets);

    return playlists.filter(p => p) as PlaylistEntity[];
  }

  private async findOneByOrder(order: number): Promise<PlaylistEntity | undefined> {
    return await this.repo.findOne({ order });
  }
  //#endregion
  //#endregion
}

export type UpdateOptions = IUpdateOrdersOptions;
export interface IUpdateOrdersOptions {
  from: number;
  to: number;
}
