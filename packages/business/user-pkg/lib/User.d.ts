import { RepositoryAccessor, UserEntity, UserRepository } from 'database-pkg';
export declare class User extends RepositoryAccessor<UserRepository> {
    constructor();
    findMany(): Promise<UserEntity[]>;
    login(email: string, password: string): Promise<UserEntity>;
    signup(user: {
        password: string;
        name: string;
        email: string;
    }): Promise<UserEntity>;
    clear(): Promise<void>;
}
//# sourceMappingURL=User.d.ts.map