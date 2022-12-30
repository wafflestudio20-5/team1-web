import { Link, Outlet } from 'react-router-dom';
import styles from './BoardList.module.scss';

export default function Layout() {
  return (
    <>
      <div className={styles['board-list-layout']}>
        <div className={styles['board-list']}>Board</div>
      </div>
      <Outlet />
    </>
  );
}
