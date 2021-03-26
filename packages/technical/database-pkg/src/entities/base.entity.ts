import {
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
} from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn()
  public deletedAt!: Date | undefined;

  @VersionColumn()
  public version!: number;
}
