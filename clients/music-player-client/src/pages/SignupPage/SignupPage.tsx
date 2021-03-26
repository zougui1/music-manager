import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FormattedMessage } from 'react-intl';

import { SignupView } from '../../views/SignupView';

export const SignupPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <FormattedMessage id="common.signup" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <SignupView />
      </IonContent>
    </IonPage>
  );
};
