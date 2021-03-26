import Joi from 'joi';

import { InputProps } from '../../components/Input';

const rules = {
  username: {
    minLength: 3,
    maxLength: 50,
  },
  password: {
    minLength: 8,
    maxLength: 512,
  },
};

export const fieldsData: FieldData[] = [
  {
    label: 'common.username',
    name: 'username',
    autoFocus: true,
    fullWidth: true,
    validationValues: rules.username,
  },
  {
    label: 'common.email',
    name: 'email',
    fullWidth: true,
  },
  {
    label: 'common.password',
    name: 'password',
    type: 'password',
    fullWidth: true,
    validationValues: rules.password,
  },
  {
    label: 'common.confirmPassword',
    name: 'confirmPassword',
    type: 'password',
    fullWidth: true,
    validationValues: {
      fieldToMatch: 'common.password',
    },
  },
];

export const formSchema = Joi.object({
  username: Joi.string()
    .min(rules.username.minLength)
    .max(rules.username.maxLength)
    .required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .min(rules.password.minLength)
    .max(rules.password.maxLength)
    .required(),
  confirmPassword: Joi.valid(Joi.ref('password')),
});

export interface IFieldData {
  label: string;
  validationValues?: any;
}

export type FieldData = IFieldData & Omit<InputProps, 'setValue' | 'getValues'>;
