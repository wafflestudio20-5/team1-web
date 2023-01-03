import styles from './Main.module.scss';

export default function Main() {
  return (
    <div className={styles['main']}>
      <div className={styles['banner']}>배너</div>
      <div className={styles['boards']}></div>
      <div className={styles['bookstore']}></div>
    </div>
  );
}
