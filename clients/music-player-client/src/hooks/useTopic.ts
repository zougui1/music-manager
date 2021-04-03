import { useSelector } from 'react-redux';
import { ObjectLiteral } from 'types-pkg';

import { State } from '../store';
import { env } from '../env';
import { buildUrl } from '../utils';

export const useTopic = (path: string, params: ObjectLiteral = {}): string | undefined => {
  const user = useSelector((state: State) => state.client.user);

  if (!user) {
    return;
  }

  const topic = buildUrl(env.NOTIFICATION_SERVER_URL + path, {
    ...params,
    user: user.id,
  });

  return topic;
}
