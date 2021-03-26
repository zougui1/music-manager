import Joi from 'joi';

import { FieldData } from '../../../../../types';

export const fieldsData: FieldData[] = [
  {
    label: 'common.playlistName',
    name: 'name',
    fullWidth: true,
    autoFocus: true,
  },
];

export const formSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});
