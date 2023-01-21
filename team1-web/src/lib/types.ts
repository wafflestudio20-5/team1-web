export type Menu = {
  id: number;
  name: string;
  urlpath: string;
};

export type User = {
  id: number;
  nickname: string;
  name: string;
  ID: string;
  myArticles: Article[];
  myCommentedArticles: Article[];
  myScrappedArticles: Article[];
};

export type UserInfo = {
  loginId: string | null;
  socialEmail: string | null;
  univEmail: string | null;
  nickname: string;
  profilePreSignedUrl: string | null;
};

export type AdditionalComment = {
  id: number;
  motherComment: Comment[];
  content: string;
  author: User;
  time: string;
  like: number;
};
export type Comment = {
  id: number;
  content: string;
  author: User;
  time: string;
  like: number;
  additionalComments: AdditionalComment[];
};

export type Article = {
  id: number;
  title: string;
  author: User;
  time: string;
  like: number;
  comments: Comment[];
  scrap: number;
};

export type Board = {
  boardId: number;
  name: string;
  // TODO: 데이터 수정 후 물음표 떼기
  articles?: Article[];
};

export type BoardList = {
  id: number;
  category: string;
  size: number;
  defaultDisplayColumnSize: number;
  boards: Board[];
};
