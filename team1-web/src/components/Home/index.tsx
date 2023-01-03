import styles from './index.module.scss';
import Account from './Account';
import Main from './Main';
import Topic from './Topic';
export default function Home() {
  return (
    <div className={styles['home']}>
      <div className={styles['container']}>
        <Account />
        <Main />
        <Topic />
      </div>
    </div>
  );
}
