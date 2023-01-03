import styles from './Account.module.scss';
import profileImg from '../../resources/profile-image.png';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();

  return (
    <div className={styles['account']}>
      <div className={styles['my-info']}>
        <img src={profileImg} alt='프로필 이미지' />
        {/* TODO: 세션 정보로 고치기 */}
        <div className={styles['nickname']}>닉네임</div>
        <div>이름</div>
        <div>아이디</div>
        <ul>
          <li>
            <button
              onClick={() => {
                navigate('');
              }}
            >
              내 정보
            </button>
          </li>
          <li>
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
      <div className={styles['my-article']}></div>
      <div className={styles['banners']}></div>
    </div>
  );
}
