import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
export default function Layout() {
  return (
    <div className={styles.app}>
      <header>
        Layout
      </header>
      <Outlet />
    </div>
  );
}
