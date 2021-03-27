import { useState } from 'react';
import { IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

import { CreatePlaylistFormDialog, PlaylistFormData } from './CreatePlaylistFormDialog';
import { PlaylistList } from '../../../../components/PlaylistList';
import { ConsumeQuery } from '../../../../components/ConsumeQuery';
import { LoadingToast } from '../../../../components/LoadingToast';
import { axios } from '../../../../utils';
import { useQuery } from '../../../../hooks';
import { useWithUserId } from '../../../../features/client';

export const PlaylistsSection = () => {
  const query = useQuery('playlists', '/api/playlists');
  const [showDialog, setShowDialog] = useState(false);
  const withUserId = useWithUserId();

  const handleDialogOk = async (data: PlaylistFormData) => {
    setShowDialog(false);

    const toastId = toast.info(<LoadingToast
      label={<FormattedMessage
        id="libraryPage.playlistSection.creatingPlaylist"
        values={{ playlist: data.name }}
      />}
    />, { autoClose: false });

    try {
      await axios.post('/api/playlists', withUserId(data));
    } catch (error) {
      console.error(error.response.data.stack)
    }
    query.refetch();

    toast.update(toastId, {
      type: toast.TYPE.SUCCESS,
      render: <FormattedMessage
        id="libraryPage.playlistSection.playlistCreated"
        values={{ playlist: data.name }}
      />,
      autoClose: 2000,
    });
  }

  return (
    <>
      <IonToolbar className="list-toolbar">
        <IonGrid>
          <IonRow>
            <IonCol size="12" className="button-col">
              <IonButton onClick={() => setShowDialog(true)} color="light" size="small">
                <FormattedMessage id="common.addPlaylist" />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>

      <CreatePlaylistFormDialog
        isOpen={showDialog}
        onOk={handleDialogOk}
        onClose={() => setShowDialog(false)}
      />

      <ConsumeQuery query={query}>
        <PlaylistList
          playlists={query.data as any}
          onOrderChange={query.refetch}
        />
      </ConsumeQuery>
    </>
  );
}
