import { axiosInstance } from '../../config/axios';
import { DataComment } from './types';
import { createCommentValidation } from '../../pages/Details/components/Comments/components/SendForm/SendForm';
import {z} from "zod"


export const getComments = (taskId:number)=>
axiosInstance.get<DataComment[]>(`/comment/${taskId}`); 

type ResponseData = Omit<DataComment, "comments"> & {}
type TaskPayload = z.infer<typeof createCommentValidation>

export const createComments = (arg: TaskPayload)=>
axiosInstance.post<{data:any}>(`/comment`, arg); 



/* 
{
    "content": "1 sub sub sub komentariy  sub kommenta sub commenta",
    "taskId": 3,
    "parentId": 12
}


content:string, id:number, parentId:number|null
*/