import { IonList, IonReorderGroup } from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';

import './PlaylistList.css';
import { PlaylistsHeader } from './PlaylistsHeader';
import { Playlist } from './Playlist';
import { colSizes } from './playlistsData';
import { axios } from '../../utils';

export const PlaylistList: React.FC<PlaylistListProps> = ({ playlists }) => {
  const handleItemReorder = async (e: CustomEvent<ItemReorderEventDetail>) => {
    const { complete } = e.detail;
    const from = e.detail.from + 1;
    const to = e.detail.to + 1;
    complete();

    const playlist = playlists.find(p => p.order === from);

    if (playlist) {
      await axios.patch(`/playlists/${playlist.id}`, { from, to })
    }
  }

  return (
    <IonList lines="none" className="playlist-list">
      <PlaylistsHeader sizes={colSizes} />

      <IonReorderGroup disabled={false} onIonItemReorder={handleItemReorder}>
        {playlists.map((playlist) => (
          <Playlist
            key={playlist.id}
            playlist={playlist}
            sizes={colSizes}
          />
        ))}
      </IonReorderGroup>
    </IonList>
  );
}

export interface PlaylistListProps {
  playlists: any[];
}
