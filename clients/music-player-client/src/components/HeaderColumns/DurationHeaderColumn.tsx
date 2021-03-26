import { IonIcon } from '@ionic/react';
import { timeOutline } from 'ionicons/icons';

import { Sizes } from '../Col';
import { Column } from '../Column';

export const DurationColumn: React.FC<DurationColumnProps> = ({ sizes }) => {
  return (
    <Column sizes={sizes} label="duration">
      <IonIcon size="small" icon={timeOutline} />
    </Column>
  );
}

export interface DurationColumnProps {
  sizes: Sizes;
}
