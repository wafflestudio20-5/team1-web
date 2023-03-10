import styles from './Comment.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import { Reply } from '../../lib/types';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { createReply, deleteReply } from '../../store/boardSlice';

export default function Comment({
  comment,
  boardId,
  postId,
  setLoading,
}: {
  comment: Reply;
  boardId: string;
  postId: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state: RootState) => state.session.token);
  const [replyPressed, setReplyPressed] = useState(false);
  const [anonym, setAnonym] = useState(false);
  const [currentReply, setCurrentReply] = useState('');

  const handleCreateReply = async () => {
    setLoading(true);
    const data = {
      token: token,
      boardId: Number(boardId),
      postId: Number(postId),
      contents: currentReply,
      parent: comment.replyId,
      isWriterAnonymous: anonym,
    };
    try {
      await dispatch(createReply(data));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleDeleteReply = async () => {
    setLoading(true);
    const data = {
      token: token,
      boardId: Number(boardId),
      postId: Number(postId),
      replyId: Number(comment.replyId),
    };
    try {
      await dispatch(deleteReply(data));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <article className={comment.isRoot ? styles['parent'] : styles['child']} id='article'>
        <img src='https://cf-fpi.everytime.kr/0.png' className={styles['picture-medium']} />
        <h3 className={comment.isPostWriter ? styles['writer'] : styles['nickname']}>
          {comment.nickname}
        </h3>
        <ul className={styles['status']}>
          {comment.isRoot && (
            <li className={styles['childcomment']} onClick={() => setReplyPressed(true)}>
              ?????????
            </li>
          )}
          {!comment.isMyReply && <li className={styles['commentvote']}>??????</li>}
          {!comment.isMyReply && <li className={styles['messagesend']}>??????</li>}
          {!comment.isMyReply && <li className={styles['abuse']}>??????</li>}
          {comment.isMyReply && (
            <li className={styles['delete']} onClick={handleDeleteReply}>
              ??????
            </li>
          )}
        </ul>
        <hr />
        <p className={styles['content']}>{comment.contents}</p>
        <time className={styles['time']}>01/26 21:15</time>
        <ul className={styles['status-vote']}>
          <li className={styles['none']}>{0}</li>
        </ul>
      </article>
      {replyPressed && comment.isRoot && (
        <div className={styles['write-comment-child']}>
          <input
            type='text'
            name='text'
            maxLength={300}
            autoComplete='off'
            placeholder='????????? ???????????????.'
            className={styles['text']}
            onChange={(e) => setCurrentReply(e.target.value)}
          />
          <ul className={styles['option']}>
            <li
              title='??????'
              className={anonym ? styles['anonym-active'] : styles['anonym']}
              onClick={() => setAnonym((e) => !e)}
            ></li>
            <li title='??????' className={styles['submit']} onClick={handleCreateReply}></li>
          </ul>
          <div className={styles['clearBothOnly']}></div>
        </div>
      )}
    </>
  );
}
