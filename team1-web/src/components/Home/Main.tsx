import styles from "./Main.module.scss";
import { BoardList, Board, HomeBoardPosts, HomePost } from "../../lib/types";
import { Link } from "react-router-dom";
import {
  useApiData,
  useApiGetBoardPosts,
  useApiGetHomePosts,
} from "../../lib/api";
import { RootState, useAppSelector } from "../../store";
import { formattedTime } from "../../lib/format";

function HasTitlePostItem({ post }: { post: HomePost }) {
  return (
    <li className={`${styles["post"]} ${styles["has-title"]}`}>
      <Link to={`${post.boardId}/v/${post.postId}`}>
        <time>{formattedTime(post.createdAt)}</time>
        <p>{post.title}</p>
      </Link>
    </li>
  );
}

function NoTitlePostItem({ post }: { post: HomePost }) {
  return (
    <li className={`${styles["post"]} ${styles["no-title"]}`}>
      <Link to={`${post.boardId}/v/${post.postId}`}>
        <p>{post.contents}</p>
        <time>{formattedTime(post.createdAt)}</time>
        <ul className={styles["status"]}>
          <li className={styles["likes"]}>{post.nlikes}</li>
          <li className={styles["replies"]}>{post.nreplies}</li>
        </ul>
      </Link>
    </li>
  );
}

function BoardItem({ board }: { board: HomeBoardPosts }) {
  return (
    <section className={styles["board"]}>
      <h1 className={styles["board-title"]}>
        <Link to={`${board.boardId}`}>{board.boardTitle}</Link>
      </h1>
      <ul className={styles["posts"]}>
        {board.posts?.map((post, index) =>
          board.hasPostTitle ? (
            <HasTitlePostItem key={index} post={post} />
          ) : (
            <NoTitlePostItem key={index} post={post} />
          )
        )}
      </ul>
    </section>
  );
}

export default function Main() {
  const token = useAppSelector((state: RootState) => state.session.token);
  const homePostsData = useApiData(useApiGetHomePosts(token));

  return (
    <article className={styles["main"]}>
      <article className={styles["banner"]}>배너</article>
      <article className={styles["boards"]}>
        {/* TODO: 추후 업데이트 */}
        {homePostsData?.map((board) => (
          <BoardItem key={board.boardId} board={board} />
        ))}
      </article>
      <article className={styles["bookstore"]}></article>
    </article>
  );
}
