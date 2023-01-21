import styles from './Main.module.scss';
import { BoardList, Board } from '../../lib/types';
import { Link } from 'react-router-dom';

function BoardItem({ board }: { board: Board }) {
  return (
    <section className={styles['board']}>
      <div className={styles['board-title']}>
        <Link to={`${board.boardId}`}>{board.name}</Link>
      </div>
      {/* TODO: 업데이트 */}
      <div></div>
    </section>
  );
}

export default function Main() {
  const boardLists: BoardList[] = [
    {
      id: 0,
      category: 'basic',
      size: 16,
      defaultDisplayColumnSize: 2,
      boards: [
        { boardId: 0, name: '자유게시판' },
        { boardId: 1, name: '비밀게시판' },
        { boardId: 2, name: '졸업생게시판' },
        { boardId: 3, name: '새내기게시판' },
        { boardId: 4, name: '시사·이슈' },
        { boardId: 5, name: '장터게시판' },
        { boardId: 6, name: '정보게시판' },
        { boardId: 7, name: '취업·진로' },
        { boardId: 8, name: '로스쿨게시판' },
        { boardId: 9, name: 'cpa 게시판👨‍💼👩‍💼' },
        { boardId: 10, name: '행시/외교원 게시판' },
        { boardId: 11, name: '🎓대학원 게시판😨' },
        { boardId: 12, name: '피트 게시판' },
        { boardId: 13, name: '변리사 게시판' },
        { boardId: 14, name: '홍보게시판' },
        { boardId: 15, name: '동아리·학회' },
      ],
    },
  ];
  return (
    <article className={styles['main']}>
      <article className={styles['banner']}>배너</article>
      <article className={styles['boards']}>
        {/* TODO: 추후 업데이트 */}
        {boardLists[0].boards.map((board) => (
          <BoardItem key={board.boardId} board={board} />
        ))}
      </article>
      <article className={styles['bookstore']}></article>
    </article>
  );
}
