import { useEffect } from 'react';
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

export const useOnUserChange = (callback: (user: any) => void, dependencies: any[] = []) =>  {
  const user = useSelector((state: State) => state.client.user);

  useEffect(() => {
    if (user?.id) {
      callback(user);
    }
  }, [user?.id, callback, ...dependencies]);
}
