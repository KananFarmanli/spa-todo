import { axiosInstance } from '../../config/axios';
import { DataBoard } from './types';

export const getBoards = () =>
  axiosInstance.get<{ data: DataBoard[] }>('/board');

export const createBoard = (name: string) =>
  axiosInstance.post<{ data: DataBoard }>('/board', { name });
