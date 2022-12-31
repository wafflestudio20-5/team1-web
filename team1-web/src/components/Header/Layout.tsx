import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import everytimeLogo from '../../resources/everytime-icon.png';

// TODO: "../lib/types" 만들어서 따로 빼기.
type Menu = {
  id: number;
  name: string;
};
type MenuItemProps = {
  menu: Menu;
  handleSelect(menuId: number): void;
  isSelected: boolean;
};

// TODO: 따로 함수 만들지 논의.
function MenuItem({ menu, handleSelect, isSelected }: MenuItemProps) {
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
                <div>에브리타임</div>
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
            <Link to='' title='내 정보'></Link>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}