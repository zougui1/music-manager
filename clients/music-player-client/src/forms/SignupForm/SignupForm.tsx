import { FormattedMessage } from 'react-intl';

import './SignupForm.css';
import { fieldsData, formSchema } from './signupFormData';
import { Form } from '../../components/Form';

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  return (
    <Form
      fields={fieldsData}
      onSubmit={onSubmit}
      schema={formSchema}
      submitLabel={<FormattedMessage id="common.signup" />}
    />
  );
}

export interface SignupFormData {
  email: string;
  username: string;
  password: string;
}

export interface SignupFormProps {
  onSubmit: (formData: SignupFormData) => void;
}
