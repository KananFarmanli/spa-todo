import { axiosInstance } from '../../config/axios';
import { DataBoardId, DataBoard } from './types';

export const getBoards = () =>
  axiosInstance.get<{ data: DataBoard[] }>('/board');
export const getBoardById = (id:number) =>
  axiosInstance.get<{ data: DataBoardId }>(`/board/${id}`);

export const createBoard = (name: string) =>
  axiosInstance.post<{ data: DataBoard }>('/board', { name });
