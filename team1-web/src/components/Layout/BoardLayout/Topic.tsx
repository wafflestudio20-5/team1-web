import styles from './Topic.module.scss';

export default function Main() {
  return (
    <div className={styles['topic']}>
      <form className={styles['search-bar']}>
        <input
          type='text'
          name='keyword'
          placeholder='전체 게시판의 글을 검색하세요!'
        />
      </form>
      {/* TODO: 업데이트 */}
      <div className={`${styles['card']} ${styles['popular-articles']}`}>
        <div>실시간 인기 글</div>
        <div></div>
      </div>
      <div className={`${styles['card']} ${styles['hot-articles']}`}>
        <div>HOT 게시물</div>
        {/* TODO: 업데이트 */}
        <div></div>
      </div>
      <div className={`${styles['card']} ${styles['best-board']}`}>
        <div>BEST 게시판</div>
        {/* TODO: 업데이트 */}
        <div></div>
      </div>
      <div className={`${styles['card']} ${styles['news']}`}>
        <div>학교 소식</div>
        {/* TODO: 업데이트 */}
        <div></div>
      </div>
      <div className={`${styles['card']} ${styles['recent-lecture-review']}`}>
        <div>최근 강의평</div>
        {/* TODO: 업데이트 */}
        <div></div>
      </div>
    </div>
  );
}
