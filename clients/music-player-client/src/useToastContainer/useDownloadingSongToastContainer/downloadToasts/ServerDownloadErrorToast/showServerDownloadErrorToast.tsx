import { toast } from 'react-toastify';

import { ServerDownloadErrorToast } from './ServerDownloadErrorToast';

export const showServerDownloadErrorToast = (toastId: React.ReactText | undefined) => {
  if (!toastId) {
    return;
  }

  toast.update(toastId, {
    type: toast.TYPE.ERROR,
    render: <ServerDownloadErrorToast />,
  });
}
