import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { FormattedMessage } from 'react-intl';

import { Tabs } from '../libraryPageData';

export const LibraryToolbar: React.FC<LibraryToolbarProps> = ({ tab, setTab }) => {
  return (
    <IonSegment value={tab} onIonChange={e => setTab(e.detail.value)}>
      <IonSegmentButton value={Tabs.playlists}>
        <IonLabel>
          <FormattedMessage id="common.playlists" />
        </IonLabel>
      </IonSegmentButton>

      {/*<IonSegmentButton value={Tabs.artists}>
        <IonLabel>
          <FormattedMessage id="common.artists" />
        </IonLabel>
      </IonSegmentButton>

      <IonSegmentButton value={Tabs.albums}>
        <IonLabel>
          <FormattedMessage id="common.albums" />
        </IonLabel>
      </IonSegmentButton>*/}

      <IonSegmentButton value={Tabs.tracks}>
        <IonLabel>
          <FormattedMessage id="common.tracks" />
        </IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export interface LibraryToolbarProps {
  tab: Tabs;
  setTab: (tab: string | undefined) => void;
}
