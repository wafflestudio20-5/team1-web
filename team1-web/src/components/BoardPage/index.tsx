import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Board } from "../../lib/types";
import ArticleItems from "./ArticleItems";
import styles from "./index.module.scss";

export default function BoardPage() {
  const boardName = "자유게시판";

  const { boardID, index } = useParams();

  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState({
    boardId: 0,
    name: "",
    articles: [
      {
        id: 2,
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
          <Link to={boardID === undefined ? "1" : boardID}>{boardName}</Link>
        </h1>
      </div>
      {loading ? (
        <div className={styles["loading"]}>불러오는 중입니다...</div>
      ) : (
        <>
          <Link to="1" className={styles["add-new-article"]}>
            새 글을 작성해주세요!
          </Link>
          {board.articles !== undefined && (
            <ArticleItems
              writingList={board.articles}
              boardID={boardID === undefined ? "1" : boardID}
              index={index === undefined ? 1 : Number(index)}
            />
          )}
        </>
      )}
      <div className={styles["pagination"]}>
        <div className={styles["search"]}>
          <select name="search_type">
            <option value="4">전체</option>
            <option value="3">해시태그</option>
            <option value="2">글 제목</option>
            <option value="1">글 내용</option>
          </select>
          <input
            name="keyword"
            placeholder="검색어를 입력하세요."
            className={styles["text"]}
          />
        </div>
        {/* TODO: 마지막이면 다음 버튼 표시 안하거나, 마지막이라는 알림 띄우기 */}
        <Link
          to={`/${boardID}/p/${(Number(index) + 1).toString()}`}
          className={styles["next"]}
        >
          다음
        </Link>
      </div>
    </article>
  );
}
