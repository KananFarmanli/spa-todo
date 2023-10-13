import { axiosInstance } from '../../config/axios';
import { DataTask } from './types';
import { createTaskValidation } from '../../pages/Columns/useColumns';
import {z} from "zod"


type TaskPayload = z.infer<typeof createTaskValidation>

export const createTask = (arg: TaskPayload) =>
  axiosInstance.post<{ data: DataTask }>('/task', arg);
  
  type MoveType={
    tasks: DataTask[];
    oldColumnId:number;
    newColumnId:number;
    
  }
  export const moveTask = (tasks:DataTask[], oldColumnId:number,newColumnId:number)=>
  axiosInstance.post<{data:any}>('/task/234/move', { tasks,oldColumnId,newColumnId }); 
  //api я создал так себе, здесь на самом деле не нужен id
  // мне не хватало времени
  
  
  export const deleteTask = (id: number) =>{

    axiosInstance.delete<{ data:any}>(`/task/${id}`)
  }

  /* /task/1 */

  type UpdateArtType={
description?:string,
priority?:string,
name?:string,
  }



  export const updateTask = (id:number,arg:UpdateArtType)=>
  axiosInstance.patch<{data:any}>(`/task/${id}`, arg); 

  