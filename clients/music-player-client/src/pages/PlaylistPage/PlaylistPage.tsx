import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';
import { RouteComponentProps } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

import { PlaylistToolbar } from './PlaylistToolbar';
import { AddSongFormDialog, AddSongFormData } from './AddSongFormDialog';
import { DownloadingSongToast } from './DownloadingSongToast';
import { ConsumeQuery } from '../../components/ConsumeQuery';
import { TrackList } from '../../components/TrackList';
import { useQuery } from '../../hooks';
import { axios } from '../../utils';

export const PlaylistPage: React.FC<PlaylistPageProps> = ({ match }) => {
  const [showAddSongDialog, setShowAddSongDialog] = useState(false);
  const playlist = useQuery<any>('playlist', `/playlists/${match.params.id}`);

  const handleReorder = (e: CustomEvent<ItemReorderEventDetail>) => {
    e.detail.complete();
  }

  const handleOk = async (data: AddSongFormData) => {
    console.log(data);
    const toastId = toast.info(<DownloadingSongToast />, { autoClose: false });
    setShowAddSongDialog(false);

    try {
      await axios.post('/musics', { playlistId: playlist.data?.id, video: data.link });
    } catch (error) {
      toast.update(toastId, {
        type: toast.TYPE.ERROR,
        render: <FormattedMessage
          id="common.serverDownloadSongFailure"
        />,
        autoClose: 2000,
      });
      return;
    }

    playlist.refetch();

    toast.update(toastId, {
      type: toast.TYPE.SUCCESS,
      render: <FormattedMessage
        id="common.serverDownloadedSong"
      />,
      autoClose: 2000,
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/library" />
          </IonButtons>

          <IonTitle>
            {playlist.data?.name ?? <FormattedMessage id="common.loading" />}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <AddSongFormDialog
          isOpen={showAddSongDialog}
          onOk={handleOk}
          onClose={() => setShowAddSongDialog(false)}
        />

        <div className="content-wrapper">
          <ConsumeQuery query={playlist}>
            <PlaylistToolbar
              tracks={playlist.data?.musics ?? []}
              onAddSong={() => setShowAddSongDialog(true)}
            />

            <TrackList tracks={playlist.data?.musics ?? []} onReorder={handleReorder} />
          </ConsumeQuery>
        </div>
      </IonContent>
    </IonPage>
  );
};

export interface PlaylistPageProps extends RouteComponentProps<{
  id: string;
}> {}
