import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
  const navigate = useNavigate();

  const [entranceYear, setEntranceYear] = useState<number>();
  const renderOptions = () => {
    const options = [];
    for (let i = 2023; i >= 1994; i--) {
      options.push(
        <option key={i} value={i}>
          {i}학번
        </option>
      );
    }
    return options;
  };
  return (
    <div className={styles['register']}>
      <h2>와플리타임 회원가입</h2>
      <p className={styles['description']}>
        와플리타임 계정으로 <strong>캠퍼스픽, 와플리타임</strong> 등<br />
        다양한 대학생 서비스를 모두 이용하실 수 있습니다.
      </p>
      <h2 className={styles['school']}>학교 선택</h2>
      <div className={styles['input']}>
        <div className={styles['label']}>
          <label>입학년도</label>
        </div>
        <select
          value={entranceYear}
          onChange={(e) => {
            setEntranceYear(Number(e.target.value));
          }}
        >
          <option>연도 선택 (학번)</option>
          {renderOptions()}
        </select>
      </div>
      <div className={styles['input']}>
        <div className={styles['label']}>
          <label>학교</label>
        </div>
        <input
          type='text'
          name='campus_name'
          placeholder='학교 이름을 검색하세요.'
          value='서울대학교'
          className={styles['search']}
          disabled={true}
        />
        <input type='hidden' name='campus_id' value='55' />
      </div>
      <input
        className={styles['submit']}
        type='submit'
        value='다음'
        onClick={() => {
          if (entranceYear) navigate('detail');
        }}
      />
    </div>
  );
}
