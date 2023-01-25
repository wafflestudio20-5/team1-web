import styles from './index.module.scss';
import profileImg from '../../resources/profile-image.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/sessionSlice';
import { useApiData, useApiGetImg, useApiGetMyInfo } from '../../lib/api';

export default function MyPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useApiData(useApiGetMyInfo());
  const userProfileImg = useApiGetImg(userInfo?.profilePreSignedUrl || null) || profileImg;

  const handleLogout = async () => {
    try {
      await dispatch(logout());
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
            <img src={userProfileImg} alt='프로필 이미지' />
            <div>
              <p>{userInfo?.loginId || '(아이디)'}</p>
              {/* TODO: 이름 정보 백엔드와 협의 */}
              <p>{`(이름) / ${userInfo?.nickname || '(닉네임)'}`}</p>
              <p>서울대 OO학번</p> {/* TODO: 학번 정보 백엔드와 협의 */}
            </div>
          </div>
        </section>
        <section className={styles['card']}>
          <p className={styles['title']}>계정</p>
          <div className={styles['content']}>
            <Link to='/auth'>학교 인증</Link>
            <Link to='password'>비밀번호 변경</Link>
            <Link to='email'>이메일 변경</Link>
          </div>
        </section>
        <section className={styles['card']}>
          <p className={styles['title']}>커뮤니티</p>
          <div className={styles['content']}>
            <Link to='nickname'>닉네임 설정</Link>
            <Link to='banlist'>이용 제한 내역</Link>
            <Link to='boardlist'>게시판 관리</Link>
            <Link to='/page/rules'>커뮤니티 이용규칙</Link>
          </div>
        </section>
        <section className={styles['card']}>
          <p className={styles['title']}>이용 안내</p>
          <div className={styles['content']}>
            <Link to='/page/faq'>문의하기</Link>
            <Link to='/notice'>공지사항</Link>
            <Link to='/page/serviceagreement'>서비스 이용약관</Link>
            <Link to='/page/privacy'>개인정보 처리방침</Link>
            <Link to='/page/youthpolicy'>청소년 보호 정책</Link>
          </div>
        </section>
        <section className={styles['card']}>
          <p className={styles['title']}>기타</p>
          <div className={styles['content']}>
            <Link to='adagreement'>정보 동의 설정</Link>
            <Link to='withdrawal'>회원 탈퇴</Link>
          </div>
        </section>
      </div>
    </article>
  );
}
