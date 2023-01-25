export type Menu = {
  id: number;
  name: string;
  urlpath: string;
};
export type MenuList = Record<string, Menu>;

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
};

export type BoardList = {
  id: number;
  category: string;
  size: number;
  defaultDisplayColumnSize: number;
  boards: Board[];
};

export type TimeObject = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export type Post = {
  boardId: number;
  boardTitle: string;
  postId: number;
  createdAt: TimeObject;
  writerId: number;
  nickname?: string; // 게시물 작성자가 익명인 경우 null
  isWriterAnonymous: Boolean;
  isQuestion: Boolean;
  title?: string;
  contents: string;
  images?: {
    imageId: number;
    preSignedUrl: string;
    description?: string;
  }[];
  nlikes: number;
  nscraps: number;
  nreplies: number;
};

export type BoardPosts = {
  content: Post[];
  pageable: {
    sort: {
      empty: Boolean;
      sorted: Boolean;
      unsorted: Boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: Boolean;
    unpaged: Boolean;
  };
  totalPages: Boolean;
  totalElements: Boolean;
  last: Boolean;
  size: number;
  number: number;
  sort: {
    empty: Boolean;
    sorted: Boolean;
    unsorted: Boolean;
  };
  numberOfElements: number;
  first: Boolean;
  empty: Boolean;
};
