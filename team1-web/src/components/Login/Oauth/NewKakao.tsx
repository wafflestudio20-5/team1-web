import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Kakao.module.scss';
import kakaoImg from '../../../resources/kakaotalk-seeklogo.com.svg';
import { kakaoLogin, kakaoSignup } from '../../../store/sessionSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../../store';

export default function Kakao() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [code] = useSearchParams();

  const token = useAppSelector((state: RootState) => state.session.token);

  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKakaoLogin = async () => {
    try {
      await dispatch(kakaoLogin(code));
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

  const handleKakaoSignup = async () => {
    try {
      await dispatch(kakaoSignup({ code, nickname }));
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // handleKakaoLogin();
  }, []);

  return (
    <div className={styles['kakao-login-waiting']}>
      <p className={styles['kakao-login-message']}>카카오 로그인을 진행중입니다.</p>
      <img className={styles['kakao-login-img']} src={kakaoImg} alt='kakao-img' />
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
            onClick={handleKakaoSignup}
          />
        </div>
      )}
    </div>
  );
}
