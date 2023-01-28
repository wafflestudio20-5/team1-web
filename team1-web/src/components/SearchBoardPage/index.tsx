import styles from './index.module.scss';
import BoardListBoard from '../Layout/BoardLayout/BoardListBoard';

export default function SearchBoardPage() {
  return (
    <>
      <BoardListBoard />
      <article className={styles['search-board-page']}>
        <article className={styles['container']}>
          <form>
            <input type='text' placeholder='게시판 검색' />
          </form>
          <div className={styles['search-result']}></div>
        </article>
      </article>
    </>
  );
}
