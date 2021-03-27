import { RepositoryAccessor, MusicEntity, MusicRepository, MusicPlayingRepository, PlaylistToMusicEntity, DeepPartial } from 'database-pkg';

export class Music extends RepositoryAccessor<MusicRepository> {

  constructor() {
    super(MusicRepository);
  }

  //#region public
  public async findMany(criteria: IFindManyCriteria): Promise<MusicEntity[]> {
    return this.repo.find({ where: { user: { id: criteria.user.id } } });
  }

  public async findById(id: number): Promise<MusicEntity | undefined> {
    return this.repo.findOne(id);
  }

  public async create(music: DeepPartial<MusicEntity>): Promise<MusicEntity> {
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
