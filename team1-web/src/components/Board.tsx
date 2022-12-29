import { Link, Outlet } from 'react-router-dom';
import styles from './Board.module.scss';

export default function Layout() {
  return (
    <div className={styles["board-layout"]}>
      <div className={styles["board"]}>
        Board
      </div>
      <Outlet />
    </div>
  );
}
