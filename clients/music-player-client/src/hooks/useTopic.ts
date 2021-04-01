import { useSelector } from 'react-redux';

import { State } from '../store';
import { env } from '../env';
import { buildTopic } from '../utils';

export const useTopic = (path: string, params: Record<string, string> = {}): string | undefined => {
  const user = useSelector((state: State) => state.client.user);

  if (!user) {
    return;
  }

  const topic = buildTopic(env.NOTIFICATION_SERVER_URL + path, {
    ...params,
    user: user.id.toString(),
  });

  return topic;
}
