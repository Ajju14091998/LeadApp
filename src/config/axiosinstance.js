import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://leadmagnetcrm.in:85/api/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
  },
  error => Promise.reject(error)
);

export default api;
