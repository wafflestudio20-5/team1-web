import { useState } from "react";
import { Post } from "../../lib/types";
import styles from "./index.module.scss";
import PostItem from "./PostItem";

export default function PostItems({
  Posts,
  index,
}: {
  Posts: Post[];
  index: number;
}) {
  return (
    <>
      {Posts &&
        Posts.map((Post: Post, index: number) => (
          <PostItem Post={Post} boardId={Post.boardId} />
        ))}
    </>
  );
}
