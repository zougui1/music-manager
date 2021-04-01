import { useMusicDownloadInit, useDownloadedCount, useDownloadProgress } from './downloadingSongHooks';
import { ServerProcessingToast } from '../ServerProcessingToast';
import { ServerDownloadingSongToast } from '../ServerDownloadingSongToast';

export const DownloadingSongToast: React.FC = () => {
  const totalCount = useMusicDownloadInit();
  const { percent, downloadingCount } = useDownloadProgress();
  const downloadedCount = useDownloadedCount();

  if (totalCount <= 0 || downloadingCount <= 0) {
    return (
      <ServerProcessingToast />
    );
  }

  return (
    <ServerDownloadingSongToast
      downloadedCount={downloadedCount}
      totalCount={totalCount}
      downloadingCount={downloadingCount}
      percent={percent}
    />
  );
}
