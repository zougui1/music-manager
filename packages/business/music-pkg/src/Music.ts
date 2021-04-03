import {
  RepositoryAccessor,
  MusicEntity,
  MusicRepository,
  MusicPlayingRepository,
  DeepPartial,
} from 'database-pkg';
import { Music as MusicTable, MusicStatus } from 'types-pkg';
import { toFilledArray } from 'utils-pkg';

export class Music extends RepositoryAccessor<MusicRepository> {

  constructor() {
    super(MusicRepository);
  }

  //#region public
  public async findMany(criteria: IFindManyCriteria): Promise<MusicEntity[]> {
    const statuses = toFilledArray(criteria.status, MusicStatus.DOWNLOADED);

    return this.repo.findMany({
      user: { id: criteria.user.id },
      status: statuses,
    });
  }

  public async findById(id: number): Promise<MusicEntity | undefined> {
    return this.repo.findOne(id);
  }

  public async updateBySource(source: MusicTable['source'], music: DeepPartial<MusicEntity>): Promise<void> {
    await this.repo.updateBySource(source, music);
  }

  public async create(music: DeepPartial<MusicEntity>[]): Promise<MusicEntity[]>;
  public async create(music: DeepPartial<MusicEntity>): Promise<MusicEntity>;
  public async create(music: DeepPartial<MusicEntity> | DeepPartial<MusicEntity>[]): Promise<MusicEntity | MusicEntity[]> {
    if (Array.isArray(music)) {
      return await this.repo.save(music);
    }

    return await this.repo.save(music);
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
  status?: MusicStatus | MusicStatus[];
}
