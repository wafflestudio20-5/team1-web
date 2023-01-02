export type Menu = {
  id: number;
  name: string;
};

export type Board = {
  id: number;
  name: string;
};

export type BoardList = {
  id: number;
  category: string;
  size: number;
  defaultDisplayColumnSize: number;
  boards: Board[];
};