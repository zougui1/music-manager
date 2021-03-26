import { IonToolbar, IonText, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { FormattedMessage } from 'react-intl';

import './PlaylistToolbar.css';
import { getTrackListDuration } from '../../../utils';

export const PlaylistToolbar: React.FC<PlaylistToolbarProps> = ({ tracks, onAddSong }) => {
  const tracksDuration = tracks.reduce((dur: number, m: any) => dur + m.duration, 0)

  return (
    <IonToolbar className="playlist-toolbar">
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonText>
              <FormattedMessage
                id="common.trackListInfo"
                values={{
                  count: tracks.length,
                  ...getTrackListDuration(tracksDuration),
                }}
              />
            </IonText>
          </IonCol>

          <IonCol size="6" className="button-col">
            <IonButton size="small" color="light" onClick={onAddSong}>
              <FormattedMessage id="common.addSong" />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonToolbar>
  );
};

export interface PlaylistToolbarProps {
  tracks: any[];
  onAddSong: (event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => void;
}
