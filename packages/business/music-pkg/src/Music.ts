import { RepositoryAccessor, MusicEntity, MusicRepository, MusicPlayingRepository, DeepPartial } from 'database-pkg';

export class Music extends RepositoryAccessor<MusicRepository> {

  constructor() {
    super(MusicRepository);
  }

  //#region public
  public async findMany(): Promise<MusicEntity[]> {
    return this.repo.find();
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
