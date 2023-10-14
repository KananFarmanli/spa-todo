import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://serverspatodo.onrender.com',
});
