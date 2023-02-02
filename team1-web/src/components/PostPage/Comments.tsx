import { Dispatch, SetStateAction, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApiData, useApiGetPost } from '../../lib/api';
import { formattedTime } from '../../lib/format';
import { Reply, Replies } from '../../lib/types';
import Comment from './Comment';
import { RootState, useAppSelector } from '../../store';
import styles from './Comments.module.scss';

export default function Comments({
  comments,
  boardId,
  postId,
  setLoading,
}: {
  comments: Replies;
  boardId: string;
  postId: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      {comments.contents &&
        comments.contents.map((comment: Reply) => (
          <Comment
            comment={comment}
            boardId={boardId}
            postId={postId}
            setLoading={setLoading}
          />
        ))}
    </>
  );
}
