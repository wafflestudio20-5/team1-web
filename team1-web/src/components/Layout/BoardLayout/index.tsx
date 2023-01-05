import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import BoardListBoard from './BoardListBoard';
import Topic from './Topic';

export default function BoardLayout() {
  return (
    <>
      <BoardListBoard />
      <div className={styles['content']}>
        <div className={styles['container']}>
          <Outlet />
          <Topic />
        </div>
      </div>
    </>
  );
}
