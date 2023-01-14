import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../store';
import { login } from '../../store/sessionSlice';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [ID, setID] = useState('');
  const [PW, setPW] = useState('');

  // TODO: 로그인 유지 추가
  const handleLogin = async () => {
    const data = {
      id: ID,
      password: PW,
    };
    try {
      await dispatch(login(data));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='container' className={styles['login']}>
      <h1 className={styles['logo']}>
        <Link to='/'>와플리타임</Link>
      </h1>
      <p className={styles['input']}>
        <input
          type='text'
          name='userid'
          className={styles['text']}
          placeholder='아이디'
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
      </p>
      <p className={styles['input']}>
        <input
          type='password'
          name='password'
          className={styles['text']}
          placeholder='비밀번호'
          value={PW}
          onChange={(e) => setPW(e.target.value)}
        />
      </p>
      <input type='hidden' name='redirect' value='/' />
      <p className={styles['submit']}>
        <input
          type='submit'
          value='로그인'
          className={styles['text']}
          onClick={handleLogin}
        />
      </p>
      <label className={styles['autologin']}>
        <input type='checkbox' name='autologin' value='1' />
        로그인 유지
      </label>
      {/* TODO: 구현 여부 결정 후 구현 */}
      <p className={styles['find']}>
        <Link to=''>아이디/비밀번호 찾기</Link>
      </p>
      {/* TODO: 회원가입 구현 */}
      <p className={styles['register']}>
        <span>와플리타임에 처음이신가요?</span>
        <Link to='/register'>회원가입</Link>
      </p>
    </div>
  );
}
