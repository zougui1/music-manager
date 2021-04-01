import { MusicDownloaded } from 'types-pkg';

import { showSongDownloadedToast } from '../../SongDownloadedToast';
import { useNotification, useTopic } from '../../../../../hooks';
import { downloadedMusic } from '../../../../../features/downloading';

export const useDownloadedCount = (): number => {
  const topic = useTopic('/download/complete/music');

  const totalCount = useNotification<MusicDownloaded, number>({
    selector: state => state.downloading.downloadedCount,
    topics: [topic],
    onMessage: (downloaded, { dispatch }) => {
      dispatch(downloadedMusic());
      showSongDownloadedToast(downloaded.title);
    },
    onError: () => console.log('Connection to SSE failed.'),
  });

  return totalCount;
}
