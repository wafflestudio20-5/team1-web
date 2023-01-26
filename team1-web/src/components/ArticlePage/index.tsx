import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./index.module.scss";

export default function ArticlePage() {
  const { boardID, articleID } = useParams();
  const boardName = "자유게시판";

  const [loading, useLoading] = useState(false);

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
        <article>
          <div className={styles["article"]}>
            <img
              src="https://cf-fpi.everytime.kr/0.png"
              className={styles["profile-picture"]}
            />
            <div className={styles["profile"]}>
              <h3 className={styles["large"]}>익명</h3>
              <time className={styles["large"]}>방금</time>
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
            <h2 className={styles["large"]}>계절 정규 재수강</h2>
            <p className={styles["large"]}>
              겨울 계절에 들은 과목 바로 다음 정규 학기에 재수강 못하나요?
            </p>
            <ul className={styles["status-left"]}>
              <li title="공감" className={styles["vote"]}>
                0
              </li>
              <li title="댓글" className={styles["comment"]}>
                0
              </li>
              <li title="스크랩" className={styles["scrap"]}>
                0
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
        <Link to={boardID === undefined ? "1" : boardID}>글 목록</Link>
      </div>
    </article>
  );
}
