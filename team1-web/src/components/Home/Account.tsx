import styles from './Account.module.scss';
import profileImg from '../../resources/profile-image.png';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLoginProvider } from '../../LoginContext';
import { useLayoutEffect } from 'react';

export default function Account() {
  const navigate = useNavigate();
  const { token, setToken } = useLoginProvider();
  const logout = () => {
    // TODO: 로그인 유지 추가

    const header = {
      headers: {
        Authorization: 'Bearer' + token,
      },
    };
    axios
      .post('http://api.wafflytime.com/api/auth/logout', null, header)
      .then((response) => {
        // TODO: Set user data
        // setUser(response["data"].owner);
        navigate('/');
        setToken(null);
        toast.success('로그아웃되었습니다.');
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.status === 401) {
          toast.error('로그인되어있지 않습니다.');
        } else {
          toast.error(error.response.data.error);
        }
      });
  };

  useLayoutEffect(() => {
    axios.defaults.headers['Content-Type'] = 'application/json';
  }, []);

  return (
    <div className={styles['account']}>
      <div className={styles['my-info']}>
        <img src={profileImg} alt='프로필 이미지' />
        {/* TODO: 세션 정보로 고치기 */}
        <div>닉네임</div>
        <div>이름</div>
        <div>아이디</div>
        <ul>
          <li>
            {/* TODO: 링크 변경 */}
            <button
              onClick={() => {
                navigate('my');
              }}
            >
              내 정보
            </button>
          </li>
          <li>
            {/* TODO: navigate 말고 로그아웃 작업으로 */}
            <button
              onClick={() => {
                logout();
              }}
            >
              로그아웃
            </button>
          </li>
        </ul>
      </div>
      <div className={styles['my-articles']}>
        {/* TODO: 링크 변경 */}
        <Link to=''>내가 쓴 글</Link>
        <Link to=''>댓글 단 글</Link>
        <Link to=''>내 스크랩</Link>
      </div>
      <div className={styles['banners']}>배너</div>
    </div>
  );
}
