import { useState } from "react";
import { Post } from "../../lib/types";
import styles from "./index.module.scss";
import PostItem from "./PostItem";

export default function PostItems({
  Posts,
  index,
  boardId,
}: {
  Posts: Post[];
  index: number;
  boardId: number;
}) {
  return (
    <>
      {Posts.map((Post: Post, index: number) => (
        <PostItem Post={Post} boardId={boardId} />
      ))}
    </>
  );
}
