import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");

  const login = () => {
    // TODO: 로그인 유지 추가
    const data = {
      username: ID,
      password: PW,
    };
    const header = {
      withCredentials: true,
      credentials: "include",
    };
    axios
      .post("http://api.wafflytime.com/api/auth/local/login", data, header)
      .then((response) => {
        // TODO: Add ContextAPI - login status(boolean, token, refresh_token), User Info
        // TODO: navigate to mainpage
        // setToken(response["data"].access_token);
        // setUser(response["data"].owner);
        // navigate("/stores/" + response["data"].owner.id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // TODO: Error handling(Incorrect password)
          // toast.error("잘못된 로그인 정보입니다!");
        } else {
          // TODO: Error handling(Unexpected)
          // toast.error(error.response.data["message"]);
        }
      });
  };

  return (
    <div id="container" className={styles["login"]}>
      <h1 className={styles["logo"]}>
        <Link to="/">에브리타임</Link>
      </h1>
      <p className={styles["input"]}>
        <input
          type="text"
          name="userid"
          className={styles["text"]}
          placeholder="아이디"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
      </p>
      <p className={styles["input"]}>
        <input
          type="password"
          name="password"
          className={styles["text"]}
          placeholder="비밀번호"
          value={PW}
          onChange={(e) => setPW(e.target.value)}
        />
      </p>
      <input type="hidden" name="redirect" value="/" />
      <p className={styles["submit"]}>
        <input
          type="submit"
          value="로그인"
          className={styles["text"]}
          onClick={login}
        />
      </p>
      <label className={styles["autologin"]}>
        <input type="checkbox" name="autologin" value="1" />
        로그인 유지
      </label>
      <p className={styles["find"]}>
        <Link to="/forgot">아이디/비밀번호 찾기</Link>
      </p>
      <p className={styles["register"]}>
        <span>에브리타임에 처음이신가요?</span>
        <Link to="/register">회원가입</Link>
      </p>
    </div>
  );
}
