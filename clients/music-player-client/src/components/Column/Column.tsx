import { IonLabel } from '@ionic/react';
import clsx from 'clsx';

import { Col, Sizes } from '../Col';

export const Column: React.FC<ColumnProps> = ({ sizes, label, className, children }) => {
  return (
    <Col sizes={sizes} className={clsx(`${label}-col`, className)}>
      <IonLabel className={`${label}-label`}>
        {children}
      </IonLabel>
    </Col>
  );
}

export interface ColumnProps {
  sizes?: Sizes | undefined;
  label: string;
  children: React.ReactChild;
  className?: string | undefined;
}
