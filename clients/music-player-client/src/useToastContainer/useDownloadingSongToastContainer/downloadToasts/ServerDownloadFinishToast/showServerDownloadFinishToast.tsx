import { toast } from 'react-toastify';

import { ServerDownloadFinishToast } from './ServerDownloadFinishToast';

export const showServerDownloadFinishToast = (toastId: React.ReactText | undefined): void => {
  if (!toastId) {
    return;
  }

  toast.update(toastId, {
    type: toast.TYPE.SUCCESS,
    autoClose: 2000,
    render: <ServerDownloadFinishToast />,
  });
}
