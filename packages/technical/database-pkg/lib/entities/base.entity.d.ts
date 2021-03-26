import { BaseEntity as TypeOrmBaseEntity } from 'typeorm';
export declare class BaseEntity extends TypeOrmBaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | undefined;
    version: number;
}
//# sourceMappingURL=base.entity.d.ts.map