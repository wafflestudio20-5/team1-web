import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import everytimeLogo from '../../resources/everytime-icon.png';
import { Menu } from '../../lib/types';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { setSelectedMenu } from '../../store/menuSlice';

function MenuItem({ menu }: { menu: Menu }) {
  const selectedMenu = useAppSelector((state: RootState) => state.menu.selectedMenu);
  const dispatch = useAppDispatch();
  return (
    <li className={styles[`${selectedMenu?.id === menu.id ? 'selected' : ''}`]}>
      <Link
        to={menu.urlpath}
        onClick={() => {
          dispatch(setSelectedMenu(menu.name));
        }}
      >
        {menu.name}
      </Link>
    </li>
  );
}

export default function Header() {
  const menuList = useAppSelector((state: RootState) => state.menu.menuList);
  // TODO: selectedMenu mypage 등으로 이동 시에도 선택해제되지 않음
  return (
    <header className={styles.header}>
      <nav>
        {/* 기존 ui와 다르게 구현; 로고 전체를 링크로 감쌈 */}
        <div className={styles.title}>
          <Link to=''>
            <div className={styles['title-wrapper']}>
              <div className={styles['logo-container']}>
                <img src={everytimeLogo} alt='logo.png' />
              </div>
              <p>와플리타임</p>
              <p>서울대</p>
            </div>
          </Link>
        </div>
        <ul className={styles['menu-list']}>
          {menuList.map((menu) => (
            <MenuItem key={menu.id} menu={menu} />
          ))}
          <li>
            <a href='https://bookstore.everytime.kr/'>책방</a>
          </li>
          <li>
            <a href='https://www.campuspick.com/'>캠퍼스픽</a>
          </li>
        </ul>
        <div className={styles['account-menu']}>
          <Link to='message' title='쪽지함'></Link>
          <Link to='my' title='내 정보'></Link>
        </div>
      </nav>
    </header>
  );
}
