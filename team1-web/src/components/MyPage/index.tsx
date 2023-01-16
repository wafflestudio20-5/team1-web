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
    try {
      await dispatch(logout(token));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <article className={styles['my-page']}>
      <div className={styles['container']}>
        <section className={`${styles['card']} ${styles['my-account']}`}>
          <div className={styles['card-header']}>
            <p className={styles['title']}>내 정보</p>
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
              <p>아이디</p>
              <p>이름 / 닉네임</p>
              <p>서울대 OO학번</p>
            </div>
          </div>
        </section>
        <section className={styles['card']}>
          <p className={styles['title']}>계정</p>
          <div className={styles['content']}>
            {/* TODO: 링크 업데이트 */}
            <Link to=''>학교 인증</Link>
            <Link to=''>비밀번호 변경</Link>
            <Link to=''>이메일 변경</Link>
          </div>
        </section>
        <section className={styles['card']}>
          <p className={styles['title']}>커뮤니티</p>
          <div className={styles['content']}>
            {/* TODO: 링크 업데이트 */}
            <Link to=''>닉네임 설정</Link>
            <Link to=''>이용 제한 내역</Link>
            <Link to=''>게시판 관리</Link>
            <Link to=''>커뮤니티 이용규칙</Link>
          </div>
        </section>
        <section className={styles['card']}>
          <p className={styles['title']}>이용 안내</p>
          <div className={styles['content']}>
            {/* TODO: 링크 업데이트 */}
            <Link to=''>문의하기</Link>
            <Link to=''>공지사항</Link>
            <Link to=''>서비스 이용약관</Link>
            <Link to=''>개인정보 처리방침</Link>
            <Link to=''>청소년 보호 정책</Link>
          </div>
        </section>
        <section className={styles['card']}>
          <p className={styles['title']}>기타</p>
          <div className={styles['content']}>
            {/* TODO: 링크 업데이트 */}
            <Link to=''>정보 동의 설정</Link>
            <Link to=''>회원 탈퇴</Link>
          </div>
        </section>
      </div>
    </article>
  );
}
