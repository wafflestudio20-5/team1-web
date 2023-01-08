import styles from './Main.module.scss';
import everytimeIcon from '../../resources/everytime-icon.png';
import { Link } from 'react-router-dom';

export default function Main() {
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";

  const KAKAO_REST_API_KEY = "2e73508a53ba1108841a05a1612720fd";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className={styles['login']}>
      <Link to='/' className={styles['logo']}>
        <img
          className={styles['img-logo']}
          src={everytimeIcon}
          alt='와플리타임 로고'
        />
      </Link>
      <Link to='/login' className={styles['button-login']}>
        로그인
      </Link>
      <Link to='/register' className={styles['button-register']}>
        와플리타임 회원가입
      </Link>
      {/* TODO: 구현 여부 논의 후  구현*/}
      <p className={styles['find']}>
        <Link to='/forgot' className={styles['link-find']}>
          아이디/비밀번호 찾기
        </Link>
      </p>
    </div>
  );
}
