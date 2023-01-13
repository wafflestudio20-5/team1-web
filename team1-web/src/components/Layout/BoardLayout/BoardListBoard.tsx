import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './BoardListBoard.module.scss';
import { Board, BoardList } from '../../../lib/types';

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
        setSelectedBoardId(board.id);
        navigate('/home/1');
      }}
    >
      {/* TODO: 링크 주소 board.id로 변경 */}
      <Link to=''>{board.name}</Link>
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
  const isOverflowed: boolean =
    boardList.size > 8 * boardList.defaultDisplayColumnSize;
  const lastDefaultDisplayIndex: number = isOverflowed
    ? boardList.defaultDisplayColumnSize * 8 - 2
    : boardList.size - 1;
  return (
    <>
      <section className={styles.group}>
        <ul>
          {boardList.boards.map(
            (board: Board, index: number) =>
              (isMoreClicked || index <= lastDefaultDisplayIndex) && (
                <BoardItem
                  key={board.id}
                  board={board}
                  isSelected={selectedBoardId === board.id}
                  setSelectedBoardId={setSelectedBoardId}
                />
              )
          )}
          {!isMoreClicked && isOverflowed && (
            // TODO: 더보기 반대 기능 '접기' 기능 구현 여부
            // TODO: 원본과 구현 차이점 설명
            // TODO: api 처리 관련 회의. 카테고리 일단 전부 가져오냐 or 더보기 클릭 시 다시 가져오냐. 현재는 전부 가져올 때의 구현방식.
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
  // TODO: REDUX로 옮기고 Board props에서 handleSelect, isSelected 제거
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
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
    {
      id: 1,
      category: 'council',
      size: 9,
      defaultDisplayColumnSize: 1,
      boards: [
        { id: 9, name: '총학생회' },
        { id: 10, name: '신문사' },
        { id: 11, name: '방송국' },
        { id: 12, name: '자연대 학생회' },
        { id: 13, name: '공과대학 학생회' },
        { id: 14, name: '사회대 학생회' },
        { id: 15, name: '사범대학 학생회' },
        { id: 16, name: '간호대학 학생회' },
        { id: 17, name: '인문대학 학생회' },
      ],
    },
  ];
  return (
    <>
      <article className={styles['board-list-layout']}>
        <article className={styles['board-list-board']}>
          <section className={styles['divider']}></section>
          {boardLists.map((boardList: BoardList) => (
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
