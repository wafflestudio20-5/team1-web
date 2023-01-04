import styles from "./Main.module.scss";
import everytime_icon from "../../resources/everytime-icon.png";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div className={styles["login"]}>
      <Link to="/" className={styles["logo"]}>
        <img className={styles["img-logo"]} src={everytime_icon} />
      </Link>
      <Link to="/login" className={styles["button-login"]}>
        로그인
      </Link>
      <Link to="/register" className={styles["button-register"]}>
        에브리타임 회원가입
      </Link>
      <p className={styles["find"]}>
        <Link to="/forgot" className={styles["link-find"]}>
          아이디/비밀번호 찾기
        </Link>
      </p>
    </div>
  );
}
