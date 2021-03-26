import _axios from 'axios';

import { env } from '../env';

export const axios = _axios.create({
  baseURL: env.API_SERVER_URL + '/api',
});
