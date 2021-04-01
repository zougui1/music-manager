import { RepositoryAccessor, MusicEntity, MusicRepository, MusicPlayingRepository, DeepPartial } from 'database-pkg';
import { Music as MusicTable, MusicStatus } from 'types-pkg';

export class Music extends RepositoryAccessor<MusicRepository> {

  constructor() {
    super(MusicRepository);
  }

  //#region public
  public async findMany(criteria: IFindManyCriteria): Promise<MusicEntity[]> {
    return this.repo.find({
      where: {
        user: { id: criteria.user.id },
        status: MusicStatus.DOWNLOADED,
      }
    });
  }

  public async findById(id: number): Promise<MusicEntity | undefined> {
    return this.repo.findOne({ id, status: MusicStatus.DOWNLOADED });
  }

  public async updateBySource(source: MusicTable['source'], music: DeepPartial<MusicEntity>): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .update(music)
      .where('source like :source', { source: `%${JSON.stringify(source)}%` })
      .execute();
  }

  public async create(music: DeepPartial<MusicEntity>[]): Promise<MusicEntity[]>;
  public async create(music: DeepPartial<MusicEntity>): Promise<MusicEntity>;
  public async create(music: DeepPartial<MusicEntity> | DeepPartial<MusicEntity>[]): Promise<MusicEntity | MusicEntity[]> {
    if (Array.isArray(music)) {
      const creates = music.map(music => this.create(music));
      return await Promise.all(creates);
    }

    return this.repo.create(music).save();
  }

  public async clear(): Promise<void> {
    await this.getRepo(MusicPlayingRepository).deleteAll();
    await this.repo.deleteAll();
  }
  //#endregion
}

export interface IFindManyCriteria {
  user: {
    id: number;
  };
}
