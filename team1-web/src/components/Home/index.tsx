import styles from './index.module.scss';
import profileImg from '../../resources/profile-image.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles['home']}>
      <div className={styles['container']}>
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
        <div className={styles['main']}>
          <div className={styles['banner']}></div>
          <div className={styles['boards']}>{/* TODO: Board */}</div>
          <div className={styles['bookstore']}></div>
        </div>
        <div className={styles['topic']}>
          <form className={styles['search-bar']}></form>
          <div className={styles['popular-articles']}></div>
          <div className={styles['hot-articles']}></div>
          <div className={styles['best-board']}></div>
          <div className={styles['news']}></div>
          <div className={styles['recent-lecture-review']}></div>
        </div>
      </div>
    </div>
  );
}
