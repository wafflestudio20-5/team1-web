import styles from './Topic.module.scss';

export default function Main() {
  return (
    <div className={styles['topic']}>
      <form className={styles['search-bar']}></form>
      <div className={styles['popular-articles']}></div>
      <div className={styles['hot-articles']}></div>
      <div className={styles['best-board']}></div>
      <div className={styles['news']}></div>
      <div className={styles['recent-lecture-review']}></div>
    </div>
  );
}
