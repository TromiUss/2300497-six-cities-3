import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './services/token';

const BACKEND_URL = 'https://16.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 150000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
};

export const api = createAPI();
