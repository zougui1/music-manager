import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';

import { useDownloadStart, useDownloadSuccess, useDownloadError } from '../../features/downloading';
import { axios } from '../../utils';

const downloadMusic = async (options: DownloadMusicOptions): Promise<AxiosResponse<any>> => {
  return await axios.post('/api/musics', {
    playlistId: options.playlistId,
    link: options.link,
  });
}

export const useDownloadMusicMutation = (): ((options: DownloadMusicOptions) => void) => {
  const downloadStart = useDownloadStart();
  const downloadSuccess = useDownloadSuccess();
  const downloadError = useDownloadError();

  const mutation = useMutation(downloadMusic, {
    onMutate: downloadStart,
    onSuccess: downloadSuccess,
    onError: downloadError,
  });

  return mutation.mutate;
}

export interface DownloadMusicOptions {
  playlistId?: string;
  link: string;
}
