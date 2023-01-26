import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApiData, useApiGetPost } from "../../lib/api";
import { formattedTime } from "../../lib/format";
import { RootState, useAppSelector } from "../../store";
import styles from "./index.module.scss";

export default function PostPage() {
  const { boardId, postId } = useParams();

  const boardName = "자유게시판";
  const token = useAppSelector((state: RootState) => state.session.token);
  const currentPost =
    useApiData(useApiGetPost(token, Number(boardId), Number(postId))) || null;

  const [loading, useLoading] = useState(false);

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
        <article>
          <div className={styles["post"]}>
            <img
              src="https://cf-fpi.everytime.kr/0.png"
              className={styles["profile-picture"]}
            />
            <div className={styles["profile"]}>
              <h3 className={styles["large"]}>
                {currentPost?.isWriterAnonymous
                  ? "익명"
                  : currentPost?.nickname}
              </h3>
              <time className={styles["large"]}>
                {currentPost?.createdAt === undefined
                  ? ""
                  : formattedTime(currentPost?.createdAt)}
              </time>
            </div>
            <ul className={styles["status"]}>
              <li
                className={styles["message-send"]}
                data-modal="messageSend"
                data-article-id="283735162"
                data-is-anonym="1"
              >
                쪽지
              </li>
              <li className={styles["abuse"]}>신고</li>
            </ul>
            <hr />
            <h2 className={styles["large"]}>{currentPost?.title}</h2>
            <p className={styles["large"]}>{currentPost?.contents}</p>
            <ul className={styles["status-left"]}>
              <li title="공감" className={styles["vote"]}>
                {currentPost?.nlikes}
              </li>
              <li title="댓글" className={styles["comment"]}>
                {currentPost?.nreplies}
              </li>
              <li title="스크랩" className={styles["scrap"]}>
                {currentPost?.nscraps}
              </li>
            </ul>
            <hr />
            <div className={styles["buttons"]}>
              <span className={styles["posvote"]}>공감</span>
              <span className={styles["scrap"]}>스크랩</span>
            </div>
          </div>
          <div className={styles["comments"]}>
            {/* style="display: block;" */}
            <div className={styles["write-comment"]}>
              <input
                type="text"
                name="text"
                maxLength={300}
                autoComplete="off"
                placeholder="댓글을 입력하세요."
                className={styles["text"]}
              />
              <ul className={styles["option"]}>
                <li title="익명" className={styles["annoym"]}></li>
                <li title="완료" className={styles["submit"]}></li>
              </ul>
              <div className={styles["clearBothOnly"]}></div>
            </div>
          </div>
        </article>
      )}
      <div className={styles["pagination"]}>
        <Link to={boardId === undefined ? "1" : boardId}>글 목록</Link>
      </div>
    </article>
  );
}
