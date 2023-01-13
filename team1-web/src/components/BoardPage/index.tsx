import styles from './index.module.scss';

export default function BoardPage() {
  return (
    <article className={styles['board']}>
      <div className={styles['board-title']}></div>
      <div className={styles['detatiled-category']}></div>
      <div className={styles['add-new-article']}></div>
      <div className={styles['notice']}></div>
      <div className={styles['articles']}></div>
    </article>
  );
}
