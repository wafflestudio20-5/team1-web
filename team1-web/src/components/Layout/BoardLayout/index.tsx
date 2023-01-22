import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import BoardListBoard from './BoardListBoard';
import Aside from './Aside';
import { useAppDispatch } from '../../../store';
import { useLayoutEffect } from 'react';
import { setSelectedMenu } from '../../../store/menuSlice';

export default function BoardLayout() {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(setSelectedMenu('게시판'));
    return ()=> {
      dispatch(setSelectedMenu(null));
    }
  }, [dispatch]);
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
