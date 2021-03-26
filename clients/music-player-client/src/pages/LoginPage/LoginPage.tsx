import { IonContent, IonPage } from '@ionic/react';
import { FormattedMessage } from 'react-intl';

import { LoginView } from './LoginView';
import { PageHeader } from '../../components/PageHeader';

export const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <PageHeader>
        <FormattedMessage id="common.login" />
      </PageHeader>
      <IonContent fullscreen>
        <LoginView />
      </IonContent>
    </IonPage>
  );
};
