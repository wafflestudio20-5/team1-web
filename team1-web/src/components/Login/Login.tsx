import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useLoginProvider } from "../../LoginContext";

export default function Login() {
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");

  const { setToken, setRefreshToken, setUser } = useLoginProvider();

  const navigate = useNavigate();

  const login = () => {
    // TODO: 로그인 유지 추가
    const data = {
      id: ID,
      password: PW,
    };
    const header = {
      withCredentials: true,
      credentials: "include",
    };
    axios
      .post("http://api.wafflytime.com/api/auth/local/login", data, header)
      .then((response) => {
        // TODO: Set user data
        // setUser(response["data"].owner);
        setToken(response["data"].access_token);
        navigate("/main/");
      })
      .catch((error) => {
        console.log(error.response);
        navigate("/main/");
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
        <Link to="/">와플리타임</Link>
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
        <span>와플리타임에 처음이신가요?</span>
        <Link to="/register">회원가입</Link>
      </p>
    </div>
  );
}
