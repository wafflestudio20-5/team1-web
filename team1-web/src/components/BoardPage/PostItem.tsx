import { useState } from "react";
import { Link } from "react-router-dom";
import { useApiData, useApiGetPost } from "../../lib/api";
import { formattedTime } from "../../lib/format";
import { Post } from "../../lib/types";
import { RootState, useAppSelector } from "../../store";
import styles from "./PostItem.module.scss";

export default function PostItem({
  Post,
  boardId,
}: {
  Post: Post;
  boardId: number;
}) {
  return (
    <Link to={`/${boardId}/v/${Post.postId}`} className={styles["Post"]}>
      <h2 className={styles["medium"]}>{Post.title}</h2>
      <p className={styles["small"]}>{Post.contents}</p>
      <time className={styles["small"]}>
        {Post?.createdAt === undefined ? "" : formattedTime(Post?.createdAt)}
      </time>
      <h3 className={styles["small"]}>
        {Post?.isWriterAnonymous ? "익명" : Post?.nickname}
      </h3>
      <ul className={styles["status"]}>
        <li className={styles["vote"]}>{Post.nlikes}</li>
        <li className={styles["comment"]}>{Post.nreplies}</li>
      </ul>
    </Link>
  );
}
