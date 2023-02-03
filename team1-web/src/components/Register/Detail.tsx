import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiRegister } from '../../lib/api';
import { axiosErrorHandler } from '../../lib/error';
import styles from './Detail.module.scss';

export default function Detail() {
  const navigate = useNavigate();

  const [ID, setID] = useState<string>('');
  const [PW, setPW] = useState<string>('');
  const [PWCheck, setPWCheck] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  async function handleRegister() {
    if (!ID) {
      toast.error('아이디를 입력하세요');
      return;
    }
    if (!PW || !PWCheck) {
      toast.error('비밀번호와 비밀번호 확인을 입력하세요');
      return;
    }
    if (PW !== PWCheck) {
      toast.error('비밀번호가 일치하지 않습니다');
      return;
    }
    try {
      const registerData = { id: ID, password: PW, nickname };
      await apiRegister(registerData);
      toast.success('회원가입을 완료했습니다');
      navigate('/');
    } catch (e) {
      axiosErrorHandler(e, '이메일을 다시 입력하세요');
    }
  }

  return (
    <div className={styles['detail']}>
      <h2>회원가입 로그인 정보 입력</h2>
      <section className={styles['input']}>
        <div>
          <label>닉네임</label>
          <p className={styles['info']}>2~10자</p>
        </div>
        <input
          className={nickname && (nickname.length < 2 ? styles['caution'] : styles['pass'])}
          type='text'
          placeholder='아이디'
          value={nickname}
          maxLength={10}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        {nickname && nickname.length < 2 && (
          <p className={styles['caution']}>2자 이상 입력하세요</p>
        )}
      </section>
      <section className={styles['input']}>
        <div>
          <label>아이디</label>
          <p className={styles['info']}>4~20자 영문, 숫자</p>
        </div>
        <input
          className={ID && (ID.length < 4 ? styles['caution'] : styles['pass'])}
          type='text'
          placeholder='아이디'
          value={ID}
          maxLength={20}
          onChange={(e) => {
            setID(e.target.value);
          }}
        />
        {ID && ID.length < 4 && <p className={styles['caution']}>4자 이상 입력하세요</p>}
      </section>
      <section className={styles['input']}>
        <div>
          <label>비밀번호</label>
        </div>
        <input
          type='password'
          placeholder='비밀번호'
          value={PW}
          maxLength={20}
          onChange={(e) => {
            setPW(e.target.value);
          }}
        />
      </section>
      <section className={styles['input']}>
        <div>
          <label>비밀번호 확인</label>
        </div>
        <input
          className={PWCheck && (PW === PWCheck ? styles['pass'] : styles['caution'])}
          type='password'
          placeholder='비밀번호 확인'
          value={PWCheck}
          maxLength={20}
          onChange={(e) => {
            setPWCheck(e.target.value);
          }}
        />
        {PWCheck && PW !== PWCheck && (
          <p className={styles['caution']}>비밀번호가 일치하지 않습니다</p>
        )}
      </section>
      <input className={styles['submit']} type='submit' value='회원가입' onClick={handleRegister} />
    </div>
  );
}
