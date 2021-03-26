import { RepositoryAccessor, UserEntity, UserRepository } from 'database-pkg';
import * as hash from 'hash-pkg';

import { IncorrectCredentialsError } from './errors';

const defaultPasswordHash = '$argon2id$v=19$m=64,t=1,p=1$IzljqZZODW3Qa8aLgBMIrw$hpB1Ub440QGRyLt58KdAu4Bw3tHDazn68xO4gleFp3w';

export class User extends RepositoryAccessor<UserRepository> {

  constructor() {
    super(UserRepository);
  }

  //#region public
  public async findMany(): Promise<UserEntity[]> {
    return await this.repo.find();
  }

  public async login(email: string, password: string): Promise<UserEntity> {
    const user = await this.repo.findByEmail(email);

    // always verify the password even if the user does not exist
    // to prevent time attacks
    const isPassword = !!user?.password;
    const isValid = await hash.verify(user?.password ?? defaultPasswordHash, password);

    if (!isValid || !isPassword || !user) {
      throw new IncorrectCredentialsError();
    }

    return user;
  }

  public async clear(): Promise<void> {
    await this.repo.deleteAll();
  }
  //#endregion
}
