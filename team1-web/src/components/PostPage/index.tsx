import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useApiData,
  useApiGetBoard,
  useApiGetChats,
  useApiGetComments,
  useApiGetPost,
} from '../../lib/api';
import { formattedTime } from '../../lib/format';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { createChat, createReply, deletePost, likePost, scrapPost } from '../../store/boardSlice';
import { Image } from '../../lib/types';
import Comments from './Comments';
import styles from './index.module.scss';

export default function PostPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardId, postId } = useParams();

  const token = useAppSelector((state: RootState) => state.session.token);

  const [loading, setLoading] = useState(false);
  const [anonym, setAnonym] = useState(false);
  const [currentReply, setCurrentReply] = useState('');

  const currentPost =
    useApiData(useApiGetPost(token, Number(boardId), Number(postId), loading)) || null;
  const comments =
    useApiData(useApiGetComments(token, Number(boardId), Number(postId), loading)) || null;
  const currentBoard = useApiData(useApiGetBoard(token, Number(boardId), loading)) || null;

  const handleCreateReply = async () => {
    setLoading(true);
    const data = {
      token: token,
      boardId: Number(boardId),
      postId: Number(postId),
      contents: currentReply,
      parent: null,
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

  const handleDeletePost = async () => {
    setLoading(true);
    const data = {
      token: token,
      boardId: Number(boardId),
      postId: Number(postId),
    };
    try {
      await dispatch(deletePost(data));
      setLoading(false);
      navigate(`/${boardId}`);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleLikePost = async () => {
    setLoading(true);
    const data = {
      token: token,
      boardId: Number(boardId),
      postId: Number(postId),
    };
    try {
      await dispatch(likePost(data));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleScrapPost = async () => {
    setLoading(true);
    const data = {
      token: token,
      boardId: Number(boardId),
      postId: Number(postId),
    };
    try {
      await dispatch(scrapPost(data));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleChat = async () => {
    const data = {
      token: token,
      boardId: Number(boardId),
      postId: Number(postId),
      replyId: null,
    };
    try {
      await dispatch(createChat(data));
    } catch (e) {
      console.log(e);
    }
  };

  const getBoardName = () => {
    switch (boardId) {
      case 'mypost':
        return '?????? ??? ???';
      case 'mycommentpost':
        return '?????? ??? ???';
      case 'myscrap':
        return '??? ?????????';
      default:
        return currentBoard?.title ? currentBoard?.title : '(??? ??? ??????)';
    }
  };

  return (
    <article className={styles['board']}>
      <div className={styles['board-title']}>
        <Link to={boardId === undefined ? '/1' : `/${boardId}`}>{getBoardName()}</Link>
      </div>
      {loading ? (
        <div className={styles['loading']}>???????????? ????????????...</div>
      ) : (
        <article>
          <div className={styles['post']}>
            <img src='https://cf-fpi.everytime.kr/0.png' className={styles['profile-picture']} />
            <div className={styles['profile']}>
              <h3 className={styles['large']}>
                {currentPost?.isWriterAnonymous ? '??????' : currentPost?.nickname}
              </h3>
              <time className={styles['large']}>
                {currentPost?.createdAt === undefined ? '' : formattedTime(currentPost?.createdAt)}
              </time>
            </div>
            <ul className={styles['status']}>
              {currentPost?.isMyPost ? (
                <li className={styles['del']} onClick={handleDeletePost}>
                  ??????
                </li>
              ) : (
                <>
                  <li
                    className={styles['message-send']}
                    data-modal='messageSend'
                    data-article-id='283735162'
                    data-is-anonym='1'
                    onClick={handleChat}
                  >
                    ??????
                  </li>
                  <li className={styles['abuse']}>??????</li>
                </>
              )}
            </ul>
            <hr />
            <h2 className={styles['large']}>{currentPost?.title}</h2>
            <p className={styles['large']}>{currentPost?.contents}</p>
            <div className={styles['attaches-full']}>
              {currentPost?.images &&
                currentPost.images.map((image: Image) => (
                  <>
                    <figure className={styles['attach']}>
                      <img src={image.preSignedUrl}></img>
                      {image.description && <figcaption>{image.description}</figcaption>}
                    </figure>
                  </>
                ))}
            </div>
            <ul className={styles['status-left']}>
              <li title='??????' className={styles['vote']}>
                {currentPost?.nlikes}
              </li>
              <li title='??????' className={styles['comment']}>
                {currentPost?.nreplies}
              </li>
              <li title='?????????' className={styles['scrap']}>
                {currentPost?.nscraps}
              </li>
            </ul>
            <hr />
            <div className={styles['buttons']}>
              <span className={styles['posvote']} onClick={handleLikePost}>
                ??????
              </span>
              <span className={styles['scrap']} onClick={handleScrapPost}>
                ?????????
              </span>
            </div>
          </div>
          <div className={styles['comments']}>
            {/* style="display: block;" */}
            {comments && (
              <Comments
                comments={comments}
                boardId={boardId === undefined ? '1' : boardId}
                postId={postId === undefined ? '1' : postId}
                setLoading={setLoading}
              />
            )}
            <div className={styles['write-comment']}>
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
          </div>
        </article>
      )}
      <div className={styles['pagination']}>
        <Link to={boardId === undefined ? '1' : boardId}>??? ??????</Link>
      </div>
    </article>
  );
}
