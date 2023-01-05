import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  return (
    <div className={styles.app}>
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}
