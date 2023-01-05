import styles from "./Register.module.scss";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className={styles["register"]}>
      <h2>와플리타임 회원가입</h2>
      <p className={styles["description"]}>
        와플리타임 계정으로 <strong>캠퍼스픽, 와플리타임</strong> 등<br />
        다양한 대학생 서비스를 모두 이용하실 수 있습니다.
      </p>
      <h2 className={styles["school"]}>학교 선택</h2>
      <div className={styles["input"]}>
        <div className={styles["label"]}>
          <label>입학년도</label>
        </div>
        <select name="enter_year">
          <option>연도 선택 (학번)</option>
          <option value="2023">2023학번</option>
          <option value="2022">2022학번</option>
          <option value="2021">2021학번</option>
          <option value="2020">2020학번</option>
          <option value="2019">2019학번</option>
          <option value="2018">2018학번</option>
          <option value="2017">2017학번</option>
          <option value="2016">2016학번</option>
          <option value="2015">2015학번</option>
          <option value="2014">2014학번</option>
          <option value="2013">2013학번</option>
          <option value="2012">2012학번</option>
          <option value="2011">2011학번</option>
          <option value="2010">2010학번</option>
          <option value="2009">2009학번</option>
          <option value="2008">2008학번</option>
          <option value="2007">2007학번</option>
          <option value="2006">2006학번</option>
          <option value="2005">2005학번</option>
          <option value="2004">2004학번</option>
          <option value="2003">2003학번</option>
          <option value="2002">2002학번</option>
          <option value="2001">2001학번</option>
          <option value="2000">2000학번</option>
          <option value="1999">1999학번</option>
          <option value="1998">1998학번</option>
          <option value="1997">1997학번</option>
          <option value="1996">1996학번</option>
          <option value="1995">1995학번</option>
          <option value="1994">1994학번</option>
        </select>
      </div>
      <div className={styles["input"]}>
        <div className={styles["label"]}>
          <label>학교</label>
        </div>
        <input
          type="text"
          name="campus_name"
          placeholder="학교 이름을 검색하세요."
          className={styles["search"]}
        />
        <input type="hidden" name="campus_id" value="55" />
      </div>
      <ol className={styles["campuses"]} />
      <Link to="/register/detail">
        <input className={styles["submit"]} type="submit" value="다음" />
      </Link>
    </div>
  );
}
