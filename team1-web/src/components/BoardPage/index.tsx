import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Board } from "../../lib/types";
import PostItems from "./PostItems";
import styles from "./index.module.scss";
import { RootState, useAppSelector } from "../../store";
import { useApiData, useApiGetBoardPosts } from "../../lib/api";

export default function BoardPage() {
  const boardName = "자유게시판";

  const { boardId, index } = useParams();

  const [loading, setLoading] = useState(false);
  const token = useAppSelector((state: RootState) => state.session.token);
  const currentPosts =
    useApiData(
      useApiGetBoardPosts(token, Number(boardId), Number(index), 20)
    ) || null;
  console.log(currentPosts);
  // const [board, setBoard] = useState({
  //   boardId: 0,
  //   name: "",
  //   Posts: [
  //     {
  //       boardId: 1,
  //       boardTitle: "자유게시판",
  //       postId: 2,
  //       createdAt: {
  //         year: 2023,
  //         month: 1,
  //         day: 26,
  //         hour: 11,
  //         minute: 20,
  //       },
  //       writerId: 1,
  //       isWriterAnonymous: true,
  //       isQuestion: false,
  //       title: "ASDF",
  //       contents: "asdfasdfasdf",
  //       nlikes: 1,
  //       nscraps: 1,
  //       nreplies: 1,
  //     },
  //     {
  //       boardId: 1,
  //       boardTitle: "자유게시판",
  //       postId: 2,
  //       createdAt: {
  //         year: 2023,
  //         month: 1,
  //         day: 26,
  //         hour: 11,
  //         minute: 20,
  //       },
  //       writerId: 1,
  //       isWriterAnonymous: true,
  //       isQuestion: false,
  //       title: "ZXCVZXCVZXCVZXCV",
  //       contents: "zxcvzxcvzxcvzxcvzxcv",
  //       nlikes: 2,
  //       nscraps: 2,
  //       nreplies: 2,
  //     },
  //   ],
  // });

  useEffect(() => {
    // TODO: board가져오는 axios
  }, []);

  return (
    <article className={styles["board"]}>
      <div className={styles["board-title"]}>
        <h1>
          <Link to={boardId === undefined ? "1" : boardId}>{boardName}</Link>
        </h1>
      </div>
      {loading ? (
        <div className={styles["loading"]}>불러오는 중입니다...</div>
      ) : (
        <>
          <Link to="1" className={styles["add-new-Post"]}>
            새 글을 작성해주세요!
          </Link>
          {currentPosts !== null && (
            <PostItems
              Posts={currentPosts.content}
              boardId={boardId === undefined ? 1 : Number(boardId)}
              index={index === undefined ? 1 : Number(index)}
            />
          )}
        </>
      )}
      <div className={styles["pagination"]}>
        {index === undefined || index === "1" ? (
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
        ) : (
          <Link
            to={`/${boardId}/p/${(
              (index === undefined ? 1 : Number(index)) - 1
            ).toString()}`}
            className={styles["prev"]}
          >
            이전
          </Link>
        )}
        {/* TODO: 마지막이면 다음 버튼 표시 안하거나, 마지막이라는 알림 띄우기 */}
        {Number(index === undefined ? 1 : index) + 1 <
          (currentPosts === null ? Infinity : currentPosts.totalPages) && (
          <Link
            to={`/${boardId}/p/${(
              (index === undefined ? 1 : Number(index)) + 1
            ).toString()}`}
            className={styles["next"]}
          >
            다음
          </Link>
        )}
      </div>
    </article>
  );
}
