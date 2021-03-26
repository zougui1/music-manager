import { FormattedMessage } from 'react-intl';

import './LoginForm.css';
import { fieldsData, formSchema } from './loginFormData';
import { Form } from '../../../../components/Form';

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <Form
      fields={fieldsData}
      onSubmit={onSubmit}
      schema={formSchema}
      submitLabel={<FormattedMessage id="common.login" />}
    />
  );
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (formData: LoginFormData) => void;
}
