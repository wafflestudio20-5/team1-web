import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApiData, useApiGetBoard, useApiGetComments, useApiGetPost } from '../../lib/api';
import { formattedTime } from '../../lib/format';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { createReply, deletePost } from '../../store/boardSlice';
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
    }
  };

  const getBoardName = () => {
    switch (boardId) {
      case 'myPost':
        return '내가 쓴 글';
      case 'myCommentPost':
        return '댓글 단 글';
      case 'myScrap':
        return '내 스크랩';
      default:
        return currentBoard?.title ? currentBoard?.title : '(알 수 없음)';
    }
  };

  return (
    <article className={styles['board']}>
      <div className={styles['board-title']}>
        <Link to={boardId === undefined ? '/1' : `/${boardId}`}>{getBoardName()}</Link>
      </div>
      {loading ? (
        <div className={styles['loading']}>불러오는 중입니다...</div>
      ) : (
        <article>
          <div className={styles['post']}>
            <img src='https://cf-fpi.everytime.kr/0.png' className={styles['profile-picture']} />
            <div className={styles['profile']}>
              <h3 className={styles['large']}>
                {currentPost?.isWriterAnonymous ? '익명' : currentPost?.nickname}
              </h3>
              <time className={styles['large']}>
                {currentPost?.createdAt === undefined ? '' : formattedTime(currentPost?.createdAt)}
              </time>
            </div>
            <ul className={styles['status']}>
              {currentPost?.isMyPost ? (
                <li className={styles['del']} onClick={handleDeletePost}>
                  삭제
                </li>
              ) : (
                <>
                  <li
                    className={styles['message-send']}
                    data-modal='messageSend'
                    data-article-id='283735162'
                    data-is-anonym='1'
                  >
                    쪽지
                  </li>
                  <li className={styles['abuse']}>신고</li>
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
              <li title='공감' className={styles['vote']}>
                {currentPost?.nlikes}
              </li>
              <li title='댓글' className={styles['comment']}>
                {currentPost?.nreplies}
              </li>
              <li title='스크랩' className={styles['scrap']}>
                {currentPost?.nscraps}
              </li>
            </ul>
            <hr />
            <div className={styles['buttons']}>
              <span className={styles['posvote']}>공감</span>
              <span className={styles['scrap']}>스크랩</span>
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
                placeholder='댓글을 입력하세요.'
                className={styles['text']}
                onChange={(e) => setCurrentReply(e.target.value)}
              />
              <ul className={styles['option']}>
                <li
                  title='익명'
                  className={anonym ? styles['anonym-active'] : styles['anonym']}
                  onClick={() => setAnonym((e) => !e)}
                ></li>
                <li title='완료' className={styles['submit']} onClick={handleCreateReply}></li>
              </ul>
              <div className={styles['clearBothOnly']}></div>
            </div>
          </div>
        </article>
      )}
      <div className={styles['pagination']}>
        <Link to={boardId === undefined ? '1' : boardId}>글 목록</Link>
      </div>
    </article>
  );
}
