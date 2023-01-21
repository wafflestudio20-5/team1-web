import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './BoardListBoard.module.scss';
import { Board, BoardList } from '../../../lib/types';
import { useApiGetBoardLists, useApiData } from '../../../lib/api';
import { RootState, useAppSelector } from '../../../store';

// TODO: selectedBoardId redux로 빼고 useParams로 처리. (게시판 벗어나도 selectedBoardId가 해제되지 않는 상태)

function BoardItem({
  board,
  isSelected,
  setSelectedBoardId,
}: {
  board: Board;
  isSelected: boolean;
  setSelectedBoardId(boardId: number): void;
}) {
  const navigate = useNavigate();
  return (
    <li
      className={styles[`${isSelected ? 'selected' : ''}`]}
      onClick={() => {
        setSelectedBoardId(board.boardId);
        navigate(`${board.boardId}`);
      }}
    >
      {/* TODO: 링크 주소 board.id로 변경 */}
      <Link to={`${board.boardId}`}>{board.name}</Link>
    </li>
  );
}

function BoardListItem({
  boardList,
  selectedBoardId,
  setSelectedBoardId,
}: {
  boardList: BoardList;
  selectedBoardId: number | null;
  setSelectedBoardId(boardId: number): void;
}) {
  const [isMoreClicked, setIsMoreClicked] = useState<boolean>(false);
  const isOverflowed: boolean = boardList.size > 8 * boardList.defaultDisplayColumnSize;
  const lastDefaultDisplayIndex: number = isOverflowed
    ? boardList.defaultDisplayColumnSize * 8 - 2
    : boardList.size - 1;
  return (
    <>
      <section className={styles.group}>
        <ul>
          {/* TODO: 추후 optional chaining 변경. 일반 chaining으로 */}
          {boardList.boards?.map(
            (board: Board, index: number) =>
              (isMoreClicked || index <= lastDefaultDisplayIndex) && (
                <BoardItem
                  key={board.boardId}
                  board={board}
                  isSelected={selectedBoardId === board.boardId}
                  setSelectedBoardId={setSelectedBoardId}
                />
              )
          )}
          {!isMoreClicked && isOverflowed && (
            <li>
              <p
                className={styles['more']}
                onClick={() => {
                  setIsMoreClicked(true);
                }}
              >
                더 보기
              </p>
            </li>
          )}
        </ul>
      </section>
      <section className={styles.divider}></section>
    </>
  );
}

export default function BoardListBoard() {
  // TODO: 게시판 오른쪽에 동그라미 기준 알아야 함
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  // TODO: boardLists.boards.articles 속성 추가
  const token = useAppSelector((state: RootState) => state.session.token);
  const boardLists = useApiData(useApiGetBoardLists(token));
  return (
    <>
      <article className={styles['board-list-layout']}>
        <article className={styles['board-list-board']}>
          <section className={styles['divider']}></section>
          {boardLists?.map((boardList: BoardList) => (
            <BoardListItem
              key={boardList.id}
              boardList={boardList}
              selectedBoardId={selectedBoardId}
              setSelectedBoardId={setSelectedBoardId}
            />
          ))}
        </article>
      </article>
    </>
  );
}
