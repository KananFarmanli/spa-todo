export type DataBoard = {
  id: number;
  name: string;
  columns?: [DataColumn, DataColumn, DataColumn];
  createdAt: string;
};

export type DataColumn = {
  id: number;
  namer: string;
  boardId: number;
  createdAt: string;
  taskId: DataTask[];
};

export type DataTask = {
  id: number;
  name: string;
  default: string;
  priority: number;
  columnId: number;
  files: DataFile[];
  comments: DataComment[];
  createdAt: string;
};

export type DataFile = {
  id: number;
  name: string;
  taskId: number;
  createdAt: string;
};

export type DataComment = {
  id: number;
  name: string;
  taskId: number;
  createdAt: string;
};
