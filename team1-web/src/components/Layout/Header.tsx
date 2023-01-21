import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import everytimeLogo from '../../resources/everytime-icon.png';
import { Menu } from '../../lib/types';

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
    <li className={styles[`${isSelected ? 'selected' : ''}`]}>
      {/* TODO: Link 주소 변경 */}
      <Link
        to={menu.urlpath}
        onClick={() => {
          handleSelect(menu.id);
        }}
      >
        {menu.name}
      </Link>
    </li>
  );
}

export default function Header() {
  // TODO: selectedMenu mypage 등으로 이동 시에도 선택해제되지 않음
  // TODO: REDUX로 옮기고 MenuItem props에서 handleSelect, isSelected 제거
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  // TODO: 이것도 백엔드에서 데이터 받을지 논의
  const menus: Menu[] = [
    { id: 0, name: '게시판', urlpath: '' },
    { id: 1, name: '시간표', urlpath: 'timetable' },
    { id: 2, name: '강의실', urlpath: 'lecture' },
    { id: 3, name: '학점계산기', urlpath: 'calculator' },
    { id: 4, name: '친구', urlpath: 'friend' },
  ];

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
            <a href='https://bookstore.everytime.kr/'>책방</a>
          </li>
          <li>
            <a href='https://www.campuspick.com/'>캠퍼스픽</a>
          </li>
        </ul>
        <div className={styles['account-menu']}>
          {/* TODO: Link 주소 변경 */}
          <Link to='message' title='쪽지함'></Link>
          <Link to='my' title='내 정보'></Link>
        </div>
      </nav>
    </header>
  );
}
