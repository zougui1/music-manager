import { useEffect } from 'react';
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
    onSubmit: async (data) => await axios.post('/auth/login', data),
    onSuccess: ({ data }) => dispatch(login(data)),
  });

  useEffect(() => {
    const login = () => {
      const inputs = document.getElementsByTagName('input');
      const emailInput = Array.from(inputs).find(input => input.name === 'email');
      const passwordInput = Array.from(inputs).find(input => input.name === 'password');
      const buttons = document.getElementsByTagName('ion-button');
      const submitButton = Array.from(buttons).find(input => input.type === 'submit');

      if (emailInput && passwordInput) {
        emailInput.value = 'zougui@gmail.com';
        passwordInput.value = 'nopassword';

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.click();
        }
      }
    }

    setTimeout(login, 10);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && e.shiftKey) {
        login();
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (process.env.NODE_ENV !== 'production') {
        window.removeEventListener('keydown', handleKeyDown);
      }
    }
  }, []);

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
