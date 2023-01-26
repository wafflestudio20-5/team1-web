import { useState } from "react";
import { Link } from "react-router-dom";
import { Article } from "../../lib/types";
import styles from "./ArticleItem.module.scss";

export default function ArticleItem({
  article,
  boardID,
}: {
  article: Article;
  boardID: string;
}) {
  return (
    <Link to={`/${boardID}/v/${article.id}`} className={styles["article"]}>
      <h2 className={styles["medium"]}>{article.title}</h2>
      <p className={styles["small"]}>{article.content}</p>
      <time className={styles["small"]}>{article.time}</time>
      <h3 className={styles["small"]}>{article.author.nickname}</h3>
      <ul className={styles["status"]}>
        <li className={styles["vote"]}>{article.like}</li>
        <li className={styles["comment"]}>{article.comments.length}</li>
      </ul>
    </Link>
  );
}
