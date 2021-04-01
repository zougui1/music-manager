import { FullDownloadProgress, DownloadType } from 'types-pkg';

import { useNotification, useTopic } from '../../../../../hooks';
import { downloadProgress } from '../../../../../features/downloading';
import { State } from '../../../../../store';

export const useDownloadProgress = () => {
  const topic = useTopic('/download/progress');

  const progress = useNotification<FullDownloadProgress[], State['downloading']['progress']>({
    selector: state => state.downloading.progress,
    topics: [topic],
    onMessage: (progresses, { dispatch }) => {
      const downloadingCount = progresses.length;
      let totalPercent = 0;

      for (const progress of progresses) {
        if (progress.type === DownloadType.track) {
          totalPercent += progress.progress.percentage;
        } else if (progress.type === DownloadType.playlist) {
          const lastTrack = progress.tracks[progress.tracks.length - 1];
          totalPercent += lastTrack.progress.percentage;
        }
      }

      const averagePercent = totalPercent / downloadingCount;

      dispatch(downloadProgress({
        percent: averagePercent,
        downloadingCount,
      }));
    },
  });

  return progress;
}
