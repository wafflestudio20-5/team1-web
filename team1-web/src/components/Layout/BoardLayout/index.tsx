import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import BoardListBoard from './BoardListBoard';
import Topic from './Topic';

export default function BoardLayout() {
  return (
    <>
      <BoardListBoard />
      <article className={styles['content']}>
        <article className={styles['container']}>
          <Outlet />
          <Topic />
        </article>
      </article>
    </>
  );
}
