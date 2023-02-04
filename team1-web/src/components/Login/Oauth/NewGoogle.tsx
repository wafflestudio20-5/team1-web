import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Google.module.scss';
import googleImg from '../../../resources/Google_logo.svg.png';
import { googleLogin, googleSignup } from '../../../store/sessionSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../../store';

export default function NewGoogle() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [code] = useSearchParams();

  const token = useAppSelector((state: RootState) => state.session.token);

  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await dispatch(googleLogin(code));
      if (token) {
        console.log(token);
        navigate('/home');
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await dispatch(googleSignup({ code, nickname }));
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGoogleLogin();
  }, []);

  return (
    <div className={styles['google-login-waiting']}>
      <p className={styles['google-login-message']}>구글 로그인을 진행중입니다.</p>
      <img className={styles['google-login-img']} src={googleImg} alt='google-img' />
      {loading ? (
        <div className={styles['spinner']} />
      ) : (
        <div className={styles['register']}>
          <h2>닉네임을 입력하세요</h2>
          <div className={styles['input']}>
            <div className={styles['label']}>
              <label>닉네임</label>
            </div>
            <input
              type='text'
              name='campus_name'
              placeholder='닉네임을 입력하세요.'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={styles['search']}
            />
            <input type='hidden' name='campus_id' value='55' />
          </div>
          <input
            className={styles['submit']}
            type='submit'
            value='다음'
            onClick={handleGoogleSignup}
          />
        </div>
      )}
    </div>
  );
}
