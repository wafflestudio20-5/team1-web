import styles from './Main.module.scss';

export default function Main() {
  return (
    <div className={styles['main']}>
      <div className={styles['banner']}></div>
      <div className={styles['boards']}>{/* TODO: Board */}</div>
      <div className={styles['bookstore']}></div>
    </div>
  );
}
