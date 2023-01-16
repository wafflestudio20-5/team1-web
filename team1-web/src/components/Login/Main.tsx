import styles from "./Main.module.scss";
import everytimeIcon from "../../resources/everytime-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Main() {
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const GOOGLE_REDIRECT_URI = "http://localhost:3000/oauth/google/callback";

  const KAKAO_REST_API_KEY = "2e73508a53ba1108841a05a1612720fd";
  const GOOGLE_REST_API_KEY =
    "586425104922-9d6vrvjkncq158aeu0gon6ipobln6jkj.apps.googleusercontent.com";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&client_id=${GOOGLE_REST_API_KEY}&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&access_type=offline`;

  const navigate = useNavigate();

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
      <a href={GOOGLE_AUTH_URL} className={styles["button-login-google"]}>
        구글로 로그인
      </a>
      <a href={KAKAO_AUTH_URL} className={styles["button-login-kakao"]}>
        카카오톡으로 로그인
      </a>
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
