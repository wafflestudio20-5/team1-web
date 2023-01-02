import styles from './index.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.account}>
          <div className={styles['my-info']}></div>
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
