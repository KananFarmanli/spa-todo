import { axiosInstance } from '../../config/axios';
import { DataBoardId, DataBoard } from './types';

export const getBoards = () =>
  axiosInstance.get<{ data: DataBoard[] }>('/board');
export const getBoardById = (id:number) =>
  axiosInstance.get<{ data: DataBoardId }>(`/board/${id}`);

export const createBoard = (name: string) =>
  axiosInstance.post<{ data: DataBoard }>('/board', { name });

type Message={
  message: string
}
export const deleteBoard = (id: number) =>
  axiosInstance.delete<{ data: Message }>(`/board/${id}`);



  /* 
  
  {{BASE_URL}}/task/2/move
  
  {
    "tasks": [
         {
            "id": 4,
            "position": 1
        }
        
       
    ],
    "oldColumnId": 1,
    "newColumnId": 3
}
  
  */