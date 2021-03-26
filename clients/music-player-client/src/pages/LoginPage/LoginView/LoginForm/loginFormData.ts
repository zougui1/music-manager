import Joi from 'joi';

import { InputProps } from '../../../../components/Input';

const rules = {
  password: {
    minLength: 4,
    maxLength: 512,
  },
};

export const fieldsData: FieldData[] = [
  {
    label: 'common.email',
    name: 'email',
    fullWidth: true,
    autoFocus: true,
  },
  {
    label: 'common.password',
    name: 'password',
    type: 'password',
    fullWidth: true,
    validationValues: rules.password,
  },
];

export const formSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .min(rules.password.minLength)
    .max(rules.password.maxLength)
    .required(),
});

export interface IFieldData {
  label: string;
  validationValues?: any;
}

export type FieldData = IFieldData & InputProps;
