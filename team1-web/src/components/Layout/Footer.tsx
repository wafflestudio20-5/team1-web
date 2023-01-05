import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles['footer']}>
      <ul>
        <li>
          <Link to=''>이용약관</Link>
        </li>
        <li>
          <Link to=''>개인정보처리방침</Link>
        </li>
        <li>
          <Link to=''>청소년보호정책</Link>
        </li>
        <li>
          <Link to=''>커뮤니티이용규칙</Link>
        </li>
        <li>
          <Link to=''>공지사항</Link>
        </li>
        <li>
          <Link to=''>문의하기</Link>
        </li>
        <li>
          <Link to=''>© 와플리타임</Link>
        </li>
      </ul>
    </footer>
  );
}
