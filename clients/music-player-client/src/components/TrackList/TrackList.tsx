import { IonList, IonReorderGroup } from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';
import clsx from 'clsx';

import './TrackList.css';
import { Track } from './Track';
import { TracksHeader } from './TracksHeader';
import { colSizes } from './tracks-data';

export const TrackList: React.FC<TrackListProps> = ({ tracks, onReorder }) => {
  return (
    <IonList lines="none" className="track-list">
      <TracksHeader sizes={colSizes} />

      <IonReorderGroup
        disabled={!onReorder}
        onIonItemReorder={onReorder}
        className={clsx({ 'reorder-enabled': !onReorder })}
      >
        {tracks.map((track, index) => (
          <Track
            key={track.id}
            track={track}
            number={index + 1}
            sizes={colSizes}
          />
        ))}
      </IonReorderGroup>
    </IonList>
  );
};

export interface TrackListProps {
  tracks: any[];
  onReorder?: (event: CustomEvent<ItemReorderEventDetail>) => any | undefined;
}
