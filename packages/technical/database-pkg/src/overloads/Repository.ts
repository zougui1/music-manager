import { Repository } from 'typeorm/repository/Repository';
import { SelectQueryBuilder } from 'typeorm';
import _ from 'lodash';

declare module 'typeorm/repository/Repository' {
  interface Repository<Entity> {
    whereEq(this: Repository<Entity>, name: string, value: any): Repository<Entity>;
    andWhereEq(this: Repository<Entity>, name: string, value: any): Repository<Entity>;
    createQuery(this: Repository<Entity>): SelectQueryBuilder<Entity>;
  }
}

Repository.prototype.createQuery = function <Entity>(this: Repository<Entity>): SelectQueryBuilder<Entity> {
  const alias = typeof this.target === 'function'
    ? _.snakeCase(this.target.name.replace(/entity$/i, ''))
    : 'entity_alias';

  const query = this.createQueryBuilder(alias);
  query._alias = alias;

  return query;
}
