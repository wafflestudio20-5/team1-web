import styles from './Account.module.scss';
import profileImg from '../../resources/profile-image.png';
import { useNavigate, Link } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/sessionSlice';

export default function Account() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state: RootState) => state.session.token);

  const handleLogout = async () => {
    await dispatch(logout(token));
    navigate('/');
  };

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
            <button onClick={handleLogout}>로그아웃</button>
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
