import { DataFile } from "../datafile/types";
import { DataComment } from "../datacomment/types"; 

export type DataTask = {
    id: number;
    name: string;
     description: string;
    priority:"LOW"|"HIGH";
    columnId: number;
    createdAt: string;
    comments: DataComment[];
    files: DataFile[];
  };


  