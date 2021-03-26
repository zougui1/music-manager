import { IonIcon, IonLabel, IonTabButton } from '@ionic/react';

export const AppTab = ({ tab, href, icon, children }: AppTabProps) => {
  return (
    <IonTabButton tab={tab} href={href}>
      <IonIcon icon={icon} />
      <IonLabel>{children}</IonLabel>
    </IonTabButton>
  );
}

export interface AppTabProps {
  tab: string;
  href: string;
  icon: string;
  children: JSX.Element | string;
}
