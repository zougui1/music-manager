import { ObjectLiteral } from 'types-pkg';

export interface State {
  client: {
    user: ObjectLiteral | null | undefined,
    language: string,
    accessToken: string | null | undefined,
  };
}
