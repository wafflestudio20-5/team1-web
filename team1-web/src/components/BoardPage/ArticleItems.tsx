import { useState } from "react";
import { Article } from "../../lib/types";
import styles from "./index.module.scss";
import ArticleItem from "./ArticleItem";

export default function ArticleItems({
  writingList,
  index,
  boardID,
}: {
  writingList: Article[];
  index: number;
  boardID: string;
}) {
  return (
    <>
      {writingList
        .slice((index - 1) * 20, index * 20)
        .map((article: Article, index: number) => (
          <ArticleItem article={article} boardID={boardID} />
        ))}
    </>
  );
}
