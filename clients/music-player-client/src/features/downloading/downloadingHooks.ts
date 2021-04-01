import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { downloadStart, downloadSuccess, downloadError } from './downloadingSlice';
import { State } from '../../store';
import { DownloadingStatus } from '../../statuses';
import { createUseDispatchAction } from '../../utils';

export const useOnMusicListChange = (onChange: () => void) => {
  const status = useSelector((state: State) => state.downloading.status);
  const downloadedCount = useSelector((state: State) => state.downloading.downloadedCount);

  useEffect(() => {
    if (status === DownloadingStatus.downloading) {
      onChange();
    }
  }, [status, downloadedCount]);
}

export const useDownloadStart = createUseDispatchAction(downloadStart);
export const useDownloadSuccess = createUseDispatchAction(downloadSuccess);
export const useDownloadError = createUseDispatchAction(downloadError);
