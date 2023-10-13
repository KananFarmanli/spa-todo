
  export type DataComment = {
    id: number;
    content: string;
    parentId:null|number
    taskId: number;
    createdAt: string;
    comments: DataComment[];
  };
  