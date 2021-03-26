import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';

export const PageHeader: React.FC = ({ children }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          {children}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
