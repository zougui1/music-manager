import _axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { store } from '../store';
import { authorizedRequestIntercepted, unauthorizedRequestIntercepted } from '../features/client';
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

const interceptResponseSuccess = (response: AxiosResponse) => {
  const newAccessToken = response.headers['access-token'];

  if (newAccessToken) {
    store.dispatch(authorizedRequestIntercepted(newAccessToken));
  }

  return response;
}

const interceptResponseFailure = async (error: AxiosError): Promise<void> => {
  if (error) {
    store.dispatch(unauthorizedRequestIntercepted());
  }

  throw error;
}

axios.interceptors.response.use(interceptResponseSuccess, interceptResponseFailure);
