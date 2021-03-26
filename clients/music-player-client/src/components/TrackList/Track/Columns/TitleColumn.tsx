import { IonLabel } from '@ionic/react';

import { Col, Sizes } from '../../../Col';

export const TitleColumn: React.FC<TitleColumnProps> = ({ title, thumbnail, artists, sizes }) => {

  return (
    <Col className="title-col" sizes={sizes}>
      <div>
        <img src={thumbnail} className="thumbnail" alt="" />

        <IonLabel>
          <h2 className="title-label">{title}</h2>
          <p className="artist-label">{artists}</p>
        </IonLabel>
      </div>
    </Col>
  );
};

export interface TitleColumnProps {
  title: string;
  thumbnail: string;
  artists: string;
  sizes: Sizes;
}
