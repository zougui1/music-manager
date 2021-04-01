import { FullMusicDownloadInit } from 'types-pkg';

import { useNotification, useTopic } from '../../../../../hooks';
import { downloadInit } from '../../../../../features/downloading';

export const useMusicDownloadInit = (): number => {
  const topic = useTopic('/download/init');

  const totalCount = useNotification<FullMusicDownloadInit, number>({
    selector: state => state.downloading.totalCount,
    topics: [topic],
    onMessage: (init, { dispatch }) => {
      dispatch(downloadInit(init.count));
    },
    onError: () => console.log('Connection to SSE failed.'),
  });

  return totalCount;
}
