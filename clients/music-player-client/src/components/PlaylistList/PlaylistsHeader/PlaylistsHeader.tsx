import { IonItem, IonReorder } from '@ionic/react';

import { DateColumn, DurationColumn, NameColumn, NumberColumn } from '../../HeaderColumns';
import { ColSizes } from '../playlistsData';

export const PlaylistsHeader: React.FC<PlaylistsHeaderProps> = ({ sizes }) => {
  return (
    <IonItem lines="full" className="playlists-header d-down:hidden">
      <IonReorder className="invisible" />
      <NumberColumn />
      <NameColumn sizes={sizes.name} />
      <DateColumn sizes={sizes.date} />
      <DurationColumn sizes={sizes.duration} />
    </IonItem>
  );
}

export interface PlaylistsHeaderProps {
  sizes: ColSizes;
}
