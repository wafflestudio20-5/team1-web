import styles from './Account.module.scss';
import profileImg from '../../resources/profile-image.png';
import { useNavigate, Link } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();

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
                navigate('');
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
