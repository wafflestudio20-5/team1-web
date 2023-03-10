import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Google.module.scss';
import { toast } from 'react-toastify';
import { useLoginProvider } from '../../../LoginContext';
import googleImg from '../../../resources/Google_logo.svg.png';

export default function Google() {
  const [params, setParmas] = useSearchParams();

  const { setToken, setRefreshToken, setUser } = useLoginProvider();

  const navigate = useNavigate();

  const GoogleSignup = () => {
    // TODO: 로그인 유지 추가
    const header = {
      // TODO: 추후 아래 내용 삭제
      // withCredentials: true,
      // credentials: "include",
    };
    axios
      .post(`http://api.wafflytime.com/api/auth/social/signup/google?code=${params.get('code')}`)
      .then((response) => {
        // TODO: Set user data
        // setUser(response["data"].owner);
        setToken(response.data.accessToken);
        navigate('/home');
        toast.success('로그인되었습니다.');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error('Kakao에서 제공한 코드가 잘못되었습니다.');
        } else if (error.response.status === 409) {
          toast.error('이미 가입된 계정입니다.');
        } else {
          toast.error('알 수 없는 에러가 발생했습니다. 운영진에게 문의하세요.');
        }
      });
  };

  const GoogleLogin = () => {
    // TODO: 로그인 유지 추가
    console.log(params);
    const header = {
      // TODO: 추후 아래 내용 삭제
      // withCredentials: true,
      // credentials: "include",
    };
    axios
      .post(`http://api.wafflytime.com/api/auth/social/login/google?code=${params.get('code')}`)
      .then((response) => {
        // TODO: Set user data
        // setUser(response["data"].owner);
        setToken(response.data.accessToken);
        navigate('/home');
        toast.success('로그인되었습니다.');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error('Kakao에서 제공한 코드가 잘못되었습니다.');
        } else if (error.response.status === 404) {
          GoogleSignup();
        } else {
          toast.error('알 수 없는 에러가 발생했습니다. 운영진에게 문의하세요.');
        }
      });
  };

  useEffect(() => {
    GoogleLogin();
  }, []);

  return (
    <div className={styles['google-login-waiting']}>
      <p className={styles['google-login-message']}>구글 로그인을 진행중입니다.</p>
      <img className={styles['google-login-img']} src={googleImg} alt='google-img' />
      <div className={styles['spinner']} />
    </div>
  );
}
