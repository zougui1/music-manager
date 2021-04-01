import { toast } from 'react-toastify';

import { DownloadingSongToast } from './DownloadingSongToast';

export const showDownloadingSongToast = (): React.ReactText => {
  return toast.info(<DownloadingSongToast />);
}
