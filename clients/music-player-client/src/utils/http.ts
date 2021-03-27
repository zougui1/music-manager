import _axios, { AxiosRequestConfig } from 'axios';

import { store } from '../store';
import { updateAccessToken } from '../features/client';
import { env } from '../env';

export const axios = _axios.create({
  baseURL: env.API_SERVER_URL,
});

axios.interceptors.request.use(config => {
  const state = store.getState();
  const { accessToken, language } = state.client;
  const headers: AxiosRequestConfig['headers'] = {};

  if (language) {
    headers['Content-Language'] = language;
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  config.headers = {
    ...(config.headers || {}),
    ...headers,
  };

  return config;
});

axios.interceptors.response.use(response => {
  const newAccessToken = response.headers['access-token'];

  if (newAccessToken) {
    store.dispatch(updateAccessToken(newAccessToken));
  }

  return response;
});
