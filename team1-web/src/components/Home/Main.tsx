import styles from './Main.module.scss';
import { BoardList, Board } from '../../lib/types';

function BoardItem({ board }: { board: Board }) {
  return <div className={styles['board']}>{board.name}</div>;
}

export default function Main() {
  const boardLists: BoardList[] = [
    {
      id: 0,
      category: 'basic',
      size: 9,
      defaultDisplayColumnSize: 2,
      boards: [
        { id: 0, name: '자유게시판' },
        { id: 1, name: '비밀게시판' },
        { id: 2, name: '졸업생게시판' },
        { id: 3, name: '새내기게시판' },
        { id: 4, name: '시사·이슈' },
        { id: 5, name: '장터게시판' },
        { id: 6, name: '정보게시판' },
        { id: 7, name: '홍보게시판' },
        { id: 8, name: '동아리·학회' },
      ],
    },
  ];
  return (
    <div className={styles['main']}>
      <div className={styles['banner']}>배너</div>
      <div className={styles['boards']}>
        {/* TODO: 추후 업데이트 */}
        {boardLists[0].boards.map((board) => (
          <BoardItem board={board} />
        ))}
      </div>
      <div className={styles['bookstore']}></div>
    </div>
  );
}
