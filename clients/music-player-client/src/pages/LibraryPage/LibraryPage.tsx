import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FormattedMessage } from 'react-intl';

import { LibraryToolbar } from './LibraryToolbar';
import { LibraryView } from './LibraryView';
import { Tabs, defaultTab } from './libraryPageData';

export const LibraryPage: React.FC = () => {
  const [tab, setTab] = useState(defaultTab);

  const changeTab = (tab: string | undefined) => {
    if (tab && tab in Tabs) {
      return setTab(Tabs[tab as Tabs]);
    }

    setTab(defaultTab);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <FormattedMessage id="common.library" />
          </IonTitle>
        </IonToolbar>
        <IonToolbar>
          <LibraryToolbar tab={tab} setTab={changeTab} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <LibraryView tab={tab} />
      </IonContent>
    </IonPage>
  );
};
