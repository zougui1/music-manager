import { FormattedMessage } from 'react-intl';

import { LoadingToast } from '../../../components/LoadingToast';
import { useNotification } from '../../../hooks';
import { env } from '../../../env';

export const DownloadingSongToast: React.FC = () => {
  const percent = useNotification<any, number>({
    defaultValue: -1,
    topics: [`${env.NOTIFICATION_SERVER_URL}/progress`],
    onMessage: ({ progress }) => progress.percentage,
    onError: () => console.log('Connection to SSE failed.'),
  });

  return (
    <LoadingToast
      label={<FormattedMessage
        id="common.serverDownloadingSong"
      />}
      percent={percent}
    />
  );
}
