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
  myArticles: Post[];
  myCommentedArticles: Post[];
  myScrappedArticles: Post[];
};

export type UserInfo = {
  loginId: string | null;
  socialEmail: string | null;
  univEmail: string | null;
  nickname: string;
  profilePreSignedUrl: string | null;
};

export type Message = {
  id: number,
  sentAt: {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number
  },
  received: string,
  contents: string
}

export type Room = {
  id: number,
  target: string,
  recentMessage: string,
  recentTime: {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    seconnd: number | null
  },
  unread: number,
  blocked: boolean
}

export type Rooms = {
  contents: Room[],
  page: number | null,
  cursor: number | null,
  size: number,
  isLast: boolean
}

export type Messages = {
  contents: Message[],
  page: number | null,
  cursor: number | null,
  size: number,
  isLast: boolean
}

export type Chat = {
  id: number;
  room: Room;
  messages: Message[];
}

export type Replies = {
  contents: Reply[];
  pageable: {
    sort: {
      empty: Boolean,
      sorted: Boolean,
      unsorted: Boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean
  },
  totalPages: boolean,
  totalElements: boolean,
  last: boolean,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  numberOfElements: number,
  first: boolean,
  empty: boolean
}

export type Reply = {
  replyId: number,
  writerId: number,
  nickname: string,
  isRoot: boolean,
  contents: string,
  isDeleted: boolean,
  isPostWriter: boolean,
  isMyReply: boolean,
};

export type Board = {
  boardId: number;
  boardType?: string;
  title?: string;
  description?: string;
  allowAnonymous?: boolean;
  // TODO: ????????? ?????? ??? ????????? ??????
};

export type BoardList = {
  id: number;
  category: string;
  size: number;
  defaultDisplayColumnSize: number;
  boards: Board[];
};

export type Image = {
  imageId: number;
  preSignedUrl: string;
  description?: string;
}

export type ImageWithDesc = {
  file: File;
  description: string;
}

export type UploadImage = {
  imageId: number;
  fileName: string;
  description: string | null;
  file: File;
}

export type PutImage = {
  imageId: number;
  filename: String;
  preSignedUrl: string;
  description?: string;
  file: File;
}

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
  nickname?: string; // ????????? ???????????? ????????? ?????? null
  isWriterAnonymous: boolean;
  isMyPost: boolean;
  isQuestion: boolean;
  title?: string;
  contents: string;
  images?: Image[];
  nlikes: number;
  nscraps: number;
  nreplies: number;
};

export type BoardPosts = {
  contents: Post[];
  page?: number;
  cursor?: number;
  size: number;
  isLast: Boolean;
};

export type HomePost = {
  boardId: number;
  boardTitle: string;
  postId: number;
  createdAt: TimeObject;
  title?: string;
  contents: string;
  images?: {
    imageId: number;
    preSignedUrl: string;
    description?: string;
  }[];
  nreplies: number;
  nlikes: number;
};

export type HomeBoardPosts = {
  boardId: number;
  boardTitle: string;
  hasPostTitle: boolean;
  posts: HomePost[];
};
