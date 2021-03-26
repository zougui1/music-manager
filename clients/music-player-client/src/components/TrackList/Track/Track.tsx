import { IonItem, IonReorder } from '@ionic/react';

import { TitleColumn } from './Columns';
import { ColSizes } from '../tracks-data';
import { FormatDate } from '../../FormatDate';
import { Column } from '../../Column';
import { formatDuration } from '../../../utils';

export const Track: React.FC<TrackProps> = ({ track, number, sizes }) => {

  return (
    <IonItem className="track">
      <IonReorder />

      <Column label="number">{number}</Column>

      <TitleColumn
        sizes={sizes.title}
        thumbnail={track.thumbnail}
        title={track.title}
        artists={track.artists}
      />

      <Column label="album" sizes={sizes.album}>{track.album}</Column>

      <Column label="date" sizes={sizes.date}>
        <FormatDate date={track.date} />
      </Column>

      <Column label="duration" sizes={sizes.duration}>
        {formatDuration(track.duration * 1000)}
      </Column>
    </IonItem>
  );
};

export interface TrackProps {
  track: any;
  number: number;
  sizes: ColSizes;
}
