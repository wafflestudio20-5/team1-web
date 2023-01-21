import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import BoardListBoard from './BoardListBoard';
import Aside from './Aside';

export default function BoardLayout() {
  return (
    <>
      <BoardListBoard />
      <article className={styles['content']}>
        <article className={styles['container']}>
          <Outlet />
          <Aside />
        </article>
      </article>
    </>
  );
}
