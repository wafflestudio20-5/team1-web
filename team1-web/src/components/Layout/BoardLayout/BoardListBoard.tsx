import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './BoardListBoard.module.scss';
import { Board, BoardList } from '../../../lib/types';
import { useApiGetBoardLists, useApiData } from '../../../lib/api';
import { RootState, useAppSelector } from '../../../store';

function BoardItem({ board }: { board: Board }) {
  const navigate = useNavigate();
  const selectedBoardId = useAppSelector((state: RootState) => state.board.selectedBoardId);

  return (
    <li
      className={styles[`${selectedBoardId === board.boardId ? 'selected' : ''}`]}
      onClick={() => {
        navigate(`${board.boardId}`);
      }}
    >
      <Link to={`${board.boardId}`}>{board.name}</Link>
    </li>
  );
}

function BoardListItem({ boardList }: { boardList: BoardList }) {
  const [isMoreClicked, setIsMoreClicked] = useState<boolean>(false);
  const isOverflowed: boolean = boardList.size > 8 * boardList.defaultDisplayColumnSize;
  const lastDefaultDisplayIndex: number = isOverflowed
    ? boardList.defaultDisplayColumnSize * 8 - 2
    : boardList.size - 1;
  return (
    <>
      <section className={styles.group}>
        <ul>
          {boardList.boards?.map(
            (board: Board, index: number) =>
              (isMoreClicked || index <= lastDefaultDisplayIndex) && (
                <BoardItem key={board.boardId} board={board} />
              )
          )}
          {boardList.category === 'OTHER' && isMoreClicked && (
            <li>
              <Link to='/community/search' className={styles['more']}>
                게시판 찾기
              </Link>
            </li>
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
  // TODO: 게시판 오른쪽에 동그라미 추가
  const token = useAppSelector((state: RootState) => state.session.token);
  const boardLists = useApiData(useApiGetBoardLists(token));
  return (
    <>
      <article className={styles['board-list-layout']}>
        <article className={styles['board-list-board']}>
          <section className={styles['divider']}></section>
          {boardLists?.map(
            (boardList: BoardList) =>
              boardList.boards && <BoardListItem key={boardList.id} boardList={boardList} />
          )}
        </article>
      </article>
    </>
  );
}
