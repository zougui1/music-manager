import { FormattedMessage } from 'react-intl';

import { LoadingToast } from '../../../../components/LoadingToast';

export const ServerDownloadingSongToast: React.FC<ServerDownloadingSongToastProps> = (props) => {
  const { percent, totalCount, downloadedCount, downloadingCount } = props;

  return (
    <LoadingToast
      label={<FormattedMessage
        id="common.serverDownloadingSong"
        values={{
          downloadedCount,
          totalCount,
          downloadingCount,
        }}
      />}
      percent={percent}
    />
  );
}

export interface ServerDownloadingSongToastProps {
  percent: number;
  downloadedCount: number;
  totalCount: number;
  downloadingCount: number;
}
