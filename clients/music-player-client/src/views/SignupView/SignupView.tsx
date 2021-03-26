import { IonGrid, IonRow } from '@ionic/react';

import { colSizes } from './signupViewData';
import { SignupForm, SignupFormData } from '../../forms/SignupForm';
import { Col } from '../../components/Col';

export const SignupView: React.FC = () => {

  const handleSubmit = (data: SignupFormData) => {
    console.log(data);
  }

  return (
    <IonGrid className="signup-form">
      <IonRow className="form-row">
        <Col sizes={colSizes.form}>
          <SignupForm onSubmit={handleSubmit} />
        </Col>
      </IonRow>
    </IonGrid>
  );
};
