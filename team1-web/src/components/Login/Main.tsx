import styles from "./Main.module.scss";
import everytimeIcon from "../../resources/everytime-icon.png";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div className={styles["login"]}>
      <Link to="/" className={styles["logo"]}>
        <img className={styles["img-logo"]} src={everytimeIcon} alt="와플리타임 로고"/>
      </Link>
      <Link to="/login" className={styles["button-login"]}>
        로그인
      </Link>
      <Link to="/register" className={styles["button-register"]}>
        와플리타임 회원가입
      </Link>
      <p className={styles["find"]}>
        <Link to="/forgot" className={styles["link-find"]}>
          아이디/비밀번호 찾기
        </Link>
      </p>
    </div>
  );
}
