import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { DeepPartial } from 'typeorm';
import { format } from 'sql-formatter';

declare module 'typeorm/query-builder/SelectQueryBuilder' {
  interface SelectQueryBuilder<Entity> {
    _alias?: string;
    whereEq(this: SelectQueryBuilder<Entity>, name: string, value: any): SelectQueryBuilder<Entity>;
    andWhereEq(this: SelectQueryBuilder<Entity>, name: string, value: any): SelectQueryBuilder<Entity>;
    printPrettySql(this: SelectQueryBuilder<Entity>): SelectQueryBuilder<Entity>;
    whereAll(this: SelectQueryBuilder<Entity>, entity: DeepPartial<Entity>): SelectQueryBuilder<Entity>;
    withAlias(this: SelectQueryBuilder<Entity>, property: string): string;
    leftJoinAndSelect(this: SelectQueryBuilder<Entity>, property: string): SelectQueryBuilder<Entity>;
  }
}

SelectQueryBuilder.prototype.whereEq = function <Entity>(this: SelectQueryBuilder<Entity>, name: string, value: any): SelectQueryBuilder<Entity> {
  this.andWhereEq(name, value);
  return this;
}

SelectQueryBuilder.prototype.andWhereEq = function <Entity>(this: SelectQueryBuilder<Entity>, name: string, value: any): SelectQueryBuilder<Entity> {
  name = this.withAlias(name);

  if (value === null) {
    this.andWhere(`${name} IS NULL`);
  } else {
    this.andWhere(`${name} = :${name}`, { [name]: value });
  }

  return this;
}

SelectQueryBuilder.prototype.printPrettySql = function <Entity>(this: SelectQueryBuilder<Entity>): SelectQueryBuilder<Entity> {
  console.log(format(this.getSql()));
  return this;
}

SelectQueryBuilder.prototype.whereAll = function <Entity>(this: SelectQueryBuilder<Entity>, entity: DeepPartial<Entity>): SelectQueryBuilder<Entity> {
  const criterias = Object.entries(entity);

  for (const [name, value] of criterias) {
    if (value && typeof value === 'object') {
      const _name = name;
      const filters = Object.entries(value).map(([name, value]) => ({ name, value }));

      for (const { name, value } of filters) {
        if (value && typeof value === 'object') {
          throw new Error('whereAll does not support nested objects.');
        }

        if (name === 'id') {
          this.andWhereEq(`${this._alias}.${_name}Id`, value);
        } else {
          this.andWhereEq(`${_name}.${name}`, value);
        }
      }
    } else {
      this.andWhereEq(`${name}`, value);
    }
  }

  return this;
}

SelectQueryBuilder.prototype.withAlias = function <Entity>(this: SelectQueryBuilder<Entity>, property: string): string {
  if (property.includes('.')) {
    return property;
  }

  if (!this._alias) {
    throw new Error(`No alias found for "${property}".`);
  }

  return `${this._alias}.${property}`;
}

const getProperty = (property: string): string => {
  const splits = property.split('.');
  return splits[splits.length - 1];
}

const leftJoinAndSelect = SelectQueryBuilder.prototype.leftJoinAndSelect;


// @ts-ignore
SelectQueryBuilder.prototype.leftJoinAndSelect = function <Entity>(this: SelectQueryBuilder<Entity>, property: string, alias: string, ...args: any[]): SelectQueryBuilder<Entity> {
  alias ??= getProperty(property);

  // @ts-ignore
  return leftJoinAndSelect.call(this, this.withAlias(property), alias, ...args);
}
