import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  showServerDownloadFinishToast,
  showServerDownloadErrorToast,
  showDownloadingSongToast,
} from './downloadToasts';
import { State } from '../../store';
import { downloadComplete } from '../../features/downloading';
import { DownloadingStatus } from '../../statuses';

export const useDownloadingSongToastContainer = () => {
  const status = useSelector((state: State) => state.downloading.status);
  const [toastId, setToastId] = useState<React.ReactText | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (status) {
      // TODO update the status to downloading on app init to
      // TODO get the notification of songs being downloaded
      // TODO across all devices
      case DownloadingStatus.downloading:
        setToastId(showDownloadingSongToast());
        break;

      case DownloadingStatus.idle:
        toast.dismiss(toastId);
        dispatch(downloadComplete());
        setToastId(undefined);
        break;

      case DownloadingStatus.success:
        showServerDownloadFinishToast(toastId);
        break;

      case DownloadingStatus.error:
        showServerDownloadErrorToast(toastId);
        break;
    }
  }, [status]);
}
