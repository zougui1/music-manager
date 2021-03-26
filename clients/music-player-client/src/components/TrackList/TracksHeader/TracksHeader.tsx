import { IonItem, IonReorder } from '@ionic/react';

import { AlbumColumn, DateColumn, DurationColumn, NumberColumn, TitleColumn } from '../../HeaderColumns';
import { ColSizes } from '../tracks-data';

export const TracksHeader: React.FC<TracksHeaderProps> = ({ sizes }) => {
  return (
    <IonItem lines="full" className="tracks-header">
      <IonReorder className="invisible" />
      <NumberColumn />
      <TitleColumn sizes={sizes.title} />
      <AlbumColumn sizes={sizes.album} />
      <DateColumn sizes={sizes.date} />
      <DurationColumn sizes={sizes.duration} />
    </IonItem>
  );
}

export interface TracksHeaderProps {
  sizes: ColSizes
}
