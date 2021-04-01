import { FormattedMessage } from 'react-intl';

export const SongDownloadedToast: React.FC<SongDownloadedToastProps> = ({ title }) => {
  return (
    <FormattedMessage
      id="common.songDownloaded"
      values={{ title }}
    />
  );
}

export interface SongDownloadedToastProps {
  title: string;
}
