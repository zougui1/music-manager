import { toast } from 'react-toastify';

import { SongDownloadedToast } from './SongDownloadedToast';

export const showSongDownloadedToast = (title: string): React.ReactText => {
  return toast.success(<SongDownloadedToast title={title} />, {
    autoClose: 2000,
    pauseOnFocusLoss: false,
  });
}
