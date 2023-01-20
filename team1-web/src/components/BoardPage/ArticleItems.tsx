import { useState } from "react";
import { Article } from "../../lib/types";
import styles from "./index.module.scss";
import ArticleItem from "./ArticleItem";

export default function ArticleItems({
  writingList,
}: {
  writingList: Article[];
}) {
  return (
    <>
      {writingList.map((article: Article, index: number) => (
        <ArticleItem article={article} />
      ))}
    </>
  );
}
