import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';
import { RouteComponentProps } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { PlaylistToolbar } from './PlaylistToolbar';
import { AddSongFormDialog, AddSongFormData } from './AddSongFormDialog';
import { useDownloadMusicMutation } from './useDownloadMusicMutation';
import { ConsumeQuery } from '../../components/ConsumeQuery';
import { TrackList } from '../../components/TrackList';
import { useOnMusicListChange } from '../../features/downloading';
import { useQuery } from '../../hooks';

export const PlaylistPage: React.FC<PlaylistPageProps> = ({ match }) => {
  const [showAddSongDialog, setShowAddSongDialog] = useState(false);
  const playlist = useQuery<any>('playlist', `/api/playlists/${match.params.id}`);
  const downloadMusic = useDownloadMusicMutation();

  useOnMusicListChange(playlist.refetch);

  const handleReorder = (e: CustomEvent<ItemReorderEventDetail>) => {
    e.detail.complete();
  }

  const handleOk = async (data: AddSongFormData) => {
    setShowAddSongDialog(false);
    downloadMusic({ playlistId: playlist.data?.id, link: data.link });
  }

  const playlistToMusics = playlist.data?.playlistToMusics ?? [];
  const musics = playlistToMusics.map((ptm: any) => {
    return {
      ...ptm.music,
      ...ptm,
    };
  });

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
              tracks={musics}
              onAddSong={() => setShowAddSongDialog(true)}
            />

            <TrackList tracks={musics} onReorder={handleReorder} />
          </ConsumeQuery>
        </div>
      </IonContent>
    </IonPage>
  );
};

export interface PlaylistPageProps extends RouteComponentProps<{
  id: string;
}> {}
