import { DataTask } from "../datatask/types"; 



export type DataColumn = {
    id: number;
    name: string;
    boardId: number;
    createdAt: string;
    task: DataTask[];
  };