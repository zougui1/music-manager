import { IonItem, IonReorder } from '@ionic/react';
import { Link } from 'react-router-dom';

import './Playlist.css';
import { ColSizes } from '../playlistsData';
import { Column } from '../../Column';
import { DateColumn, DurationColumn } from '../../Columns';

export const Playlist: React.FC<PlaylistProps> = ({ playlist, sizes }) => {
  return (
    <IonItem className="playlist">
      <Link to={`/playlists/${playlist.id}`} className="link">
        <IonReorder slot="start" />

        <Column label="number">{playlist.order}</Column>
        <Column sizes={sizes.name} label="name">{playlist.name}</Column>

        <DateColumn
          sizes={sizes.date}
          className="sm-down:text-right"
          date={playlist.createdAt}
        />

        <DurationColumn
          sizes={sizes.duration}
          duration={playlist.musics?.reduce((acc: number, val: any) => acc + val.duration, 0)}
        />
      </Link>
    </IonItem>
  );
}

export interface PlaylistProps {
  playlist: any;
  sizes: ColSizes;
}
