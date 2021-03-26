import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FormattedMessage } from 'react-intl';

export const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <FormattedMessage id="common.settings" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      </IonContent>
    </IonPage>
  );
};
