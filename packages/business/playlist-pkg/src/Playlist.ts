import { RepositoryAccessor, PlaylistEntity, PlaylistRepository, MusicEntity, PlaylistToMusicEntity } from 'database-pkg';
import { range } from 'utils-pkg';

import { PlaylistNotFoundError } from './errors';

export class Playlist extends RepositoryAccessor<PlaylistRepository> {

  constructor() {
    super(PlaylistRepository);
  }

  //#region public
  public async findMany(options: IFindManyOptions): Promise<PlaylistEntity[]> {
    return this.repo.find({
      where: { user: { id: options.user.id } },
      relations: ['playlistToMusics', 'playlistToMusics.music'],
      /*join: {
        alias: 'playlist',
        leftJoinAndSelect: {
          playlistToMusics: 'playlist.playlistToMusics',
          musics: 'playlistToMusics.music',
        },
      },*/
    });
  }

  public async findById(id: number): Promise<PlaylistEntity | undefined> {
    return this.repo.findOne(id);
  }

  public async update(target: IUpdateTarget, options: UpdateOptions): Promise<void> {
    await this.updateManyOrder(target, options);
  }

  public async create(playlist: { name: string, user: { id: number } }): Promise<PlaylistEntity> {
    const lastPlaylist = await this.repo.findOne({ order: { order: 'DESC' } });

    const lastOrder = lastPlaylist?.order ?? 0;
    const playlistData = {
      ...playlist,
      order: lastOrder + 1,
      userId: playlist.user.id,
    };

    return await this.repo.create(playlistData).save();
  }

  public async addMusic(playlistId: number, music: MusicEntity): Promise<void> {
    const playlist = await this.repo.findOne(playlistId, { relations: ['playlistToMusics'] });

    if (!playlist) {
      throw new PlaylistNotFoundError();
    }

    const orders = playlist.playlistToMusics
      .map(p => p.order)
      // enforce 0 to be the default value if `playlistToMusics` is empty
      .concat([0]);
    const lastOrder = Math.max(...orders);
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
    //await this.getRepo(PlaylistToMusicRepository).deleteAll();
    await this.repo.deleteAll();
  }
  //#endregion

  //#region private
  //#region update order
  private async updateManyOrder(target: IUpdateTarget, { from, to }: IUpdateOrdersOptions): Promise<void> {
    const playlist = await this.repo.findOne({ id: target.id, user: { id: target.user.id } });

    if (!playlist) {
      throw new PlaylistNotFoundError();
    }

    if (from < to) {
      const orders = range(from + 1, to);
      const playlists = await this.findManyByOrder(orders);
      await this.decrementOrders(playlists);
    } else {
      const orders = range(to, from);
      const playlists = await this.findManyByOrder(orders);
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

export interface IFindManyOptions {
  user: {
    id: number,
  };
}

export interface IUpdateTarget {
  id: number;
  user: {
    id: number,
  };
}
export type UpdateOptions = IUpdateOrdersOptions;
export interface IUpdateOrdersOptions {
  from: number;
  to: number;
}
