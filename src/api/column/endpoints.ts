import { axiosInstance } from '../../config/axios';
import { DataColumn } from './types';

export const getColumn = (id:number) =>
  axiosInstance.get<{ data: DataColumn[] }>(`/board/${id}`);