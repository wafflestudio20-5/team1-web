import styles from './index.module.scss';
import Account from './Account';
import Main from './Main';

export default function Home() {
  return (
    <article className={styles['home']}>
      <Account />
      <Main />
    </article>
  );
}
