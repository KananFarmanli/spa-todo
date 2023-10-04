import { DataColumn } from "../column/types";

export type DataBoard = {
  id: number;
  name: string;
  createdAt: string;
}
export type DataBoardId = {
  id: number;
  name: string;
  columns: DataColumn[];
  createdAt: string;
}
