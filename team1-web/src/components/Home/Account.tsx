import styles from './Account.module.scss';
import profileImg from '../../resources/profile-image.png';
import { useNavigate, Link } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/sessionSlice';
import { useApiData, useApiGetImg, useApiGetMyInfo } from '../../lib/api';

export default function Account() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state: RootState) => state.session.token);
  const userInfo = useApiData(useApiGetMyInfo(token));
  const userProfileImg = useApiGetImg(userInfo?.profilePreSignedUrl || null) || profileImg;

  const handleLogout = async () => {
    try {
      await dispatch(logout(token));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className={styles['account']}>
      <article className={styles['my-info']}>
        <img src={userProfileImg} alt='프로필 이미지' />
        <p>{userInfo?.nickname || '(닉네임)'}</p>
        <p>(이름)</p> {/* TODO: 이름 정보 백엔드와 협의 */}
        <p>{userInfo?.loginId || '(아이디)'}</p>
        <ul>
          <li>
            <Link to='my' className={styles['button']}>
              내 정보
            </Link>
          </li>
          <li>
            <button className={styles['button']} onClick={handleLogout}>
              로그아웃
            </button>
          </li>
        </ul>
      </article>
      <article className={styles['my-Posts']}>
        <Link to='myPost'>내가 쓴 글</Link>
        <Link to='myCommentPost'>댓글 단 글</Link>
        <Link to='myScrap'>내 스크랩</Link>
      </article>
      <article className={styles['banners']}>배너</article>
    </article>
  );
}
