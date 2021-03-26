import Joi from 'joi';

import { FieldData } from '../../../types';

export const fieldsData: FieldData[] = [
  {
    label: 'common.link',
    name: 'link',
    fullWidth: true,
    autoFocus: true,
  },
];

export const formSchema = Joi.object({
  link: Joi.string().uri().required(),
});
