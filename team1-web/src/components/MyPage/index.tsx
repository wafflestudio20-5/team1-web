import styles from './index.module.scss';
import profileImg from '../../resources/profile-image.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/sessionSlice';

export default function MyPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state: RootState) => state.session.token);
  
  const handleLogout = async () => {
    await dispatch(logout(token));
    navigate('/');
  };
  return (
    <div className={styles['my-page']}>
      <div className={styles['container']}>
        <div className={`${styles['card']} ${styles['my-account']}`}>
          <div className={styles['card-header']}>
            <div className={styles['title']}>내 정보</div>
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              로그아웃
            </button>
          </div>
          <div className={styles['profile']}>
            <img src={profileImg} alt='프로필 이미지' />
            {/* TODO: 세션 정보로 업데이트 */}
            <div>
              <div>아이디</div>
              <div>이름 / 닉네임</div>
              <div>서울대 OO학번</div>
            </div>
          </div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>계정</div>
          <div className={styles['content']}>
            {/* TODO: 링크 업데이트 */}
            <Link to=''>학교 인증</Link>
            <Link to=''>비밀번호 변경</Link>
            <Link to=''>이메일 변경</Link>
          </div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>커뮤니티</div>
          <div className={styles['content']}>
            {/* TODO: 링크 업데이트 */}
            <Link to=''>닉네임 설정</Link>
            <Link to=''>이용 제한 내역</Link>
            <Link to=''>게시판 관리</Link>
            <Link to=''>커뮤니티 이용규칙</Link>
          </div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>이용 안내</div>
          <div className={styles['content']}>
            {/* TODO: 링크 업데이트 */}
            <Link to=''>문의하기</Link>
            <Link to=''>공지사항</Link>
            <Link to=''>서비스 이용약관</Link>
            <Link to=''>개인정보 처리방침</Link>
            <Link to=''>청소년 보호 정책</Link>
          </div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>기타</div>
          <div className={styles['content']}>
            {/* TODO: 링크 업데이트 */}
            <Link to=''>정보 동의 설정</Link>
            <Link to=''>회원 탈퇴</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
