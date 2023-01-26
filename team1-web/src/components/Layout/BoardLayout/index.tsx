import { Outlet, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import BoardListBoard from './BoardListBoard';
import Aside from './Aside';
import { useAppDispatch } from '../../../store';
import { useLayoutEffect } from 'react';
import { setSelectedMenu } from '../../../store/menuSlice';
import { setSelectedBoardId } from '../../../store/boardSlice';

export default function BoardLayout() {
  const dispatch = useAppDispatch();
  const { boardId } = useParams(); // TODO: 게시물 페이지 작업 후 추가
  useLayoutEffect(() => {
    if (!Number.isNaN(Number(boardId))) dispatch(setSelectedBoardId(Number(boardId)));
    dispatch(setSelectedMenu('게시판'));
    return () => {
      dispatch(setSelectedMenu(null));
      dispatch(setSelectedBoardId(null));
    };
  }, [dispatch, boardId]);
  return (
    <>
      <BoardListBoard />
      <article className={styles['content']}>
        <article className={styles['container']}>
          <Outlet />
          <Aside />
        </article>
      </article>
    </>
  );
}
