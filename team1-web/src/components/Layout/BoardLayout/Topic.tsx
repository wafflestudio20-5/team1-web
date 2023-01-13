import styles from './Topic.module.scss';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <aside className={styles['topic']}>
      <form className={styles['search-bar']}>
        <input
          type='text'
          name='keyword'
          placeholder='전체 게시판의 글을 검색하세요!'
        />
      </form>
      {/* TODO: 업데이트 */}
      <section className={`${styles['card']} ${styles['popular-articles']}`}>
        <p className={styles['card-title']}>실시간 인기 글</p>
        <div></div>
      </section>
      <section className={`${styles['card']} ${styles['hot-articles']}`}>
        <Link to='' className={styles['card-title']}>
          HOT 게시물
        </Link>
        {/* TODO: 업데이트 */}
        <div></div>
      </section>
      <section className={`${styles['card']} ${styles['best-board']}`}>
        <Link to='' className={styles['card-title']}>
          BEST 게시판
        </Link>
        {/* TODO: 업데이트 */}
        <div></div>
      </section>
      <section className={`${styles['card']} ${styles['news']}`}>
        <p className={styles['card-title']}>학교 소식</p>
        {/* TODO: 업데이트 */}
        <div></div>
      </section>
      <section
        className={`${styles['card']} ${styles['recent-lecture-review']}`}
      >
        <Link to='' className={styles['card-title']}>
          최근 강의평
        </Link>
        {/* TODO: 업데이트 */}
        <div></div>
      </section>
    </aside>
  );
}
