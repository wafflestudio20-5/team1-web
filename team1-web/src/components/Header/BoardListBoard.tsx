import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './BoardListBoard.module.scss';
import { Board, BoardList } from '../../lib/types';

function Board({
  board,
  handleSelect,
  isSelected,
}: {
  board: Board;
  handleSelect(boardId: number): void;
  isSelected: boolean;
}) {
  return (
    <li
      className={styles[`${isSelected ? 'selected' : ''}`]}
      onClick={() => {
        handleSelect(board.id);
      }}
    >
      {/* TODO: 링크 주소 board.id로 변경 */}
      <Link to=''>{board.name}</Link>
    </li>
  );
}

function BoardList({ boardList }: { boardList: BoardList }) {
  // TODO: REDUX로 옮기고 Board props에서 handleSelect, isSelected 제거
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const isOverflowed = boardList.size > 8 * boardList.defaultDisplayColumnSize;
  const lastDefaultDisplayIndex = isOverflowed
    ? boardList.defaultDisplayColumnSize * 8 - 2
    : boardList.size - 1;
  return (
    <>
      <div className={styles.group}>
        <ul>
          {boardList.boards.map(
            (board, index) =>
              index <= lastDefaultDisplayIndex && (
                <Board
                  key={board.id}
                  board={board}
                  handleSelect={() => {
                    setSelectedBoardId(board.id);
                  }}
                  isSelected={selectedBoardId === board.id}
                />
              )
          )}
          {isOverflowed && (
            // TODO: 링크 주소 더보기 처리
            <li>
              <Link to='' className={styles['more']}>
                더보기
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.divider}></div>
    </>
  );
}

export default function Layout() {
  // TODO: 게시판 오른쪽에 동그라미 기준 알아야 함
  // TODO: boardLists.boards.articles 속성 추가
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
    <>
      <div className={styles['board-list-layout']}>
        <div className={styles['board-list-board']}>
          <div className={styles['divider']}></div>
          {boardLists.map((boardList) => (
            <BoardList key={boardList.id} boardList={boardList} />
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}
