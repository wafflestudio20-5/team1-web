import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import everytimeLogo from '../resources/everytime-icon.png';

export default function Layout() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <nav>
          {/* 기존 ui와 다르게 구현; 로고 전체를 링크로 감쌈 */}
          <div className={styles.logo}>
            <Link to=''>
              <div className={styles['logo-wrapper']}>
                <div>
                  <img src={everytimeLogo} alt='logo.png' />
                </div>
                <div>에브리타임</div>
                <div>서울대</div>
              </div>
            </Link>
          </div>
          <ul className={styles.navigation}>
            {/* TODO: Link 주소 변경 */}
            <li>
              <Link to=''>게시판</Link>
            </li>
            <li>
              <Link to=''>시간표</Link>
            </li>
            <li>
              <Link to=''>강의실</Link>
            </li>
            <li>
              <Link to=''>학점계산기</Link>
            </li>
            <li>
              <Link to=''>친구</Link>
            </li>
            <li>
              <Link to=''>책방</Link>
            </li>
            <li>
              <a href='https://www.campuspick.com/'>캠퍼스픽</a>
            </li>
          </ul>
          <div className={styles['menu']}>
            {/* TODO: Link 주소 변경 */}
            <Link to='' title='쪽지함'></Link>
            <Link to='' title='내 정보'></Link>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
