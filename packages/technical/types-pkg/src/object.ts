export interface ObjectOf<T> {
  [key: string]: T;
}

export type ObjectLiteral = ObjectOf<any>;
