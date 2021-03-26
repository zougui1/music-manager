import { Redirect } from 'react-router-dom';
import { IonGrid, IonRow } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import { colSizes } from './loginViewData';
import { LoginForm } from './LoginForm';
import { Col } from '../../../components/Col';
import { axios } from '../../../utils';
import { useSubmit } from '../../../hooks';
import { login } from '../../../features/client';
import { State } from '../../../store';

export const LoginView: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: State) => state.client.accessToken);

  const { handleSubmit, error } = useSubmit({
    onSubmit: async (data) => await axios.post('/login', data),
    onSuccess: ({ data }) => dispatch(login(data)),
  });

  return (
    <IonGrid className="login-form">
      {accessToken && <Redirect to="/" />}

      <IonRow className="form-row">
        <Col sizes={colSizes.form}>
          <LoginForm onSubmit={handleSubmit} />

          <div className="form-error">
            <Typography color="error">
              {error?.response?.data.message}
            </Typography>
          </div>
        </Col>
      </IonRow>
    </IonGrid>
  );
}
