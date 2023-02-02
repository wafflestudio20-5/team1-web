import styles from './Aside.module.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  useApiData,
  useApiGetHotPosts,
  useApiGetLatestPosts,
} from '../../../lib/api';
import { RootState, useAppSelector } from '../../../store';
import { Post } from '../../../lib/types';
import { formattedTime } from '../../../lib/format';
import { DateTime } from 'luxon';
import { useState } from 'react';

function RealTimePopularPostCard({ postPair }: { postPair: Post[] | null }) {
  return (
    <section className={styles['card']}>
      <h1 className={`${styles['card-title']} ${styles['card-title-text']}`}>
        실시간 인기 글
      </h1>
      <ul className={`${styles['posts']} ${styles['popular-posts']}`}>
        {postPair?.map((post, index) => (
          <li key={index} className={styles['post']}>
            <Link to={`${post.boardId}/v/${post.postId}`}>
              <p className={styles['post-title']}>{post.title || '제목없음'}</p>
              <p className={styles['post-contents']}>{post.contents}</p>
              <h1 className={styles['post-board-title']}>{post.boardTitle}</h1>
              <ul className={styles['status']}>
                <li className={styles['likes']}>{post.nlikes}</li>
                <li className={styles['replies']}>{post.nreplies}</li>
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function HotPostCard({ hotPostList }: { hotPostList: Post[] | undefined }) {
  return (
    <section className={styles['card']}>
      <h1 className={styles['card-title']}>
        <Link to='hotPost' className={styles['card-title-text']}>
          HOT 게시물
        </Link>
      </h1>
      <ul className={`${styles['posts']} ${styles['hot-posts']}`}>
        {hotPostList?.map(
          (post, index) =>
            index < 4 && (
              <li key={index} className={styles['post']}>
                <Link to={`${post.boardId}/v/${post.postId}`}>
                  <time>{formattedTime(post.createdAt)}</time>
                  <p>{post.title || post.contents}</p>
                </Link>
              </li>
            )
        )}
      </ul>
    </section>
  );
}

function SchoolNewsPostCard({ postPair }: { postPair: Post[] | undefined }) {
  return (
    <section className={styles['card']}>
      <h1 className={`${styles['card-title']} ${styles['card-title-text']}`}>
        학교 소식
      </h1>
      <ul className={`${styles['posts']} ${styles['school-news-posts']}`}>
        {postPair?.map((post, index) => (
          <li key={index} className={styles['post']}>
            <Link to={`${post.boardId}/v/${post.postId}`}>
              <p className={styles['post-contents']}>
                {post.title} <br />
                {post.contents}
              </p>
              <h1 className={styles['post-board-title']}>{post.boardTitle}</h1>
              <ul className={styles['status']}>
                <li className={styles['likes']}>{post.nlikes}</li>
                <li className={styles['replies']}>{post.nreplies}</li>
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Aside() {
  const token = useAppSelector((state: RootState) => state.session.token);
  const { contents: hotPostList } = useApiData(useApiGetHotPosts(token)) || {
    content: null,
  };
  const realTimePopularPostPair =
    hotPostList
      ?.sort(
        (a, b) =>
          b.nlikes - a.nlikes ||
          DateTime.fromObject(a.createdAt)
            .diff(DateTime.fromObject(b.createdAt))
            .toMillis()
      )
      .slice(0, 2) || null;
  const latestStudentBoardsPostPair = useApiData(
    useApiGetLatestPosts(token, 'STUDENT')
  );

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const navigate = useNavigate();

  return (
    <aside className={styles['topic']}>
      <form
        className={styles['search-bar']}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type='text'
          name='keyword'
          placeholder='전체 게시판의 글을 검색하세요!'
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`search/all/${searchKeyword}`);
            }
          }}
        />
      </form>

      <RealTimePopularPostCard postPair={realTimePopularPostPair} />
      <HotPostCard hotPostList={hotPostList} />

      <section className={`${styles['card']} ${styles['best-board']}`}>
        <h1 className={styles['card-title']}>
          <Link to='bestPost' className={styles['card-title-text']}>
            BEST 게시판
          </Link>
        </h1>
        {/* TODO: 업데이트 */}
        <div></div>
      </section>

      <SchoolNewsPostCard postPair={latestStudentBoardsPostPair} />

      <section
        className={`${styles['card']} ${styles['recent-lecture-review']}`}
      >
        <h1 className={styles['card-title']}>
          <Link to='lecture' className={styles['card-title-text']}>
            최근 강의평
          </Link>
        </h1>
        {/* TODO: 업데이트 */}
        <div></div>
      </section>
    </aside>
  );
}
