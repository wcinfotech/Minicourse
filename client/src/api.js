import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const fallbackMessage = error.message || 'Request failed';
    const { status, data } = error.response || {};
    error.normalized = {
      status: status || 0,
      message: data?.message || fallbackMessage,
      details: data?.details,
    };
    return Promise.reject(error);
  },
);

export default api;
