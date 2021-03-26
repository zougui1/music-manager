import { ObjectLiteral } from 'types-pkg';
import { useSelector } from 'react-redux';

import { State } from '../../store';

export const useWithUserId = () => {
  const user = useSelector((state: State) => state.client.user);

  const withUserId = <T extends ObjectLiteral>(data: T): T & { userId: string } => {
    return {
      ...data,
      userId: user?.id,
    }
  }

  return withUserId;
}
