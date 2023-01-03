import styles from './index.module.scss';

export default function MyPage() {
  return (
    <div className={styles['my-page']}>
      <div className={styles['container']}>
        <div className={`${styles['card']} ${styles['my-account']}`}>
          <div className={styles['card-header']}>
            <div className={styles['title']}>내 정보</div>
            <button>로그아웃</button>
          </div>
          <div></div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>계정</div>
          <div></div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>커뮤니티</div>
          <div></div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>이용 안내</div>
          <div></div>
        </div>
        <div className={styles['card']}>
          <div className={styles['title']}>기타</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
