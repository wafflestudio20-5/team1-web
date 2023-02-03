import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Kakao.module.scss';
import kakaoImg from '../../../resources/kakaotalk-seeklogo.com.svg';
import { kakaoLogin } from '../../../store/sessionSlice';
import { useAppDispatch } from '../../../store';

export default function Kakao() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [code] = useSearchParams();

  const handleKakaoLogin = async () => {
    try {
      await dispatch(kakaoLogin(code));
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleKakaoLogin();
  }, []);

  return (
    <div className={styles['kakao-login-waiting']}>
      <p className={styles['kakao-login-message']}>카카오 로그인을 진행중입니다.</p>
      <img className={styles['kakao-login-img']} src={kakaoImg} alt='kakao-img' />
      <div className={styles['spinner']} />
    </div>
  );
}
