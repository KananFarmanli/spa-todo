import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://tasky-jrbi.onrender.com',
});
