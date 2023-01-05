import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import everytimeLogo from '../../resources/everytime-icon.png';
import { Menu } from '../../lib/types';
import Footer from './Footer';

function MenuItem({
  menu,
  handleSelect,
  isSelected,
}: {
  menu: Menu;
  handleSelect(menuId: number): void;
  isSelected: boolean;
}) {
  return (
    <li
      className={styles[`${isSelected ? 'selected' : ''}`]}
      onClick={() => {
        handleSelect(menu.id);
      }}
    >
      {/* TODO: Link 주소 변경 */}
      <Link to=''>{menu.name}</Link>
    </li>
  );
}

export default function Layout() {
  // TODO: REDUX로 옮기고 MenuItem props에서 handleSelect, isSelected 제거
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  // TODO: 이것도 백엔드에서 데이터 받을지 논의
  const menus: Menu[] = [
    { id: 0, name: '게시판' },
    { id: 1, name: '시간표' },
    { id: 2, name: '강의실' },
    { id: 3, name: '학점계산기' },
    { id: 4, name: '친구' },
    { id: 5, name: '책방' },
  ];

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
                <div>와플리타임</div>
                <div>서울대</div>
              </div>
            </Link>
          </div>
          <ul className={styles['menu-list']}>
            {menus.map((menu) => (
              <MenuItem
                key={menu.id}
                menu={menu}
                handleSelect={() => {
                  setSelectedMenuId(menu.id);
                }}
                isSelected={selectedMenuId === menu.id}
              />
            ))}
            <li>
              <a href='https://www.campuspick.com/'>캠퍼스픽</a>
            </li>
          </ul>
          <div className={styles['account-menu']}>
            {/* TODO: Link 주소 변경 */}
            <Link to='' title='쪽지함'></Link>
            <Link to='my' title='내 정보'></Link>
          </div>
        </nav>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}
