import { useEffect, useState } from "react";
import { Board } from "../../lib/types";
import ArticleItems from "./ArticleItems";
import styles from "./index.module.scss";

export default function BoardPage() {
  const boardName = "자유게시판";
  const boardID = 0;
  const writingList = [];

  const [board, setBoard] = useState({
    boardId: 0,
    name: "",
    articles: [
      {
        id: 1,
        title: "string",
        author: {
          id: 1,
          nickname: "string",
          name: "string",
          ID: "string",
          myArticles: [],
          myCommentedArticles: [],
          myScrappedArticles: [],
        },
        content: "string",
        time: "string",
        like: 1,
        comments: [],
        scrap: 0,
      },
    ],
  });

  useEffect(() => {
    // TODO: board가져오는 axios
  }, []);

  return (
    <article className={styles["board"]}>
      <div className={styles["board-title"]}>
        <h1>
          <a href={boardID.toString()}>{boardName}</a>
        </h1>
      </div>
      <a className={styles["add-new-article"]}>새 글을 작성해주세요!</a>
      {board.articles !== undefined && (
        <ArticleItems writingList={board.articles} />
      )}
    </article>
  );
}
