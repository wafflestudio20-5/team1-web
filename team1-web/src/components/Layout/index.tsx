import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useApiData, useApiGetChats } from '../../lib/api';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { setChats } from '../../store/boardSlice';
import Chat from './Chat';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.session.token);
  const chatId = useAppSelector((state: RootState) => state.board.selectedChatId);
  const currentChats = useApiData(useApiGetChats(token));
  useEffect(() => {
    dispatch(
      setChats(
        currentChats?.contents.map((room) => {
          return { room: room, messages: [], id: room.id };
        })
      )
    );
  }, [currentChats]);

  return (
    <div className='app'>
      <Header />
      <main>
        <Outlet />
      </main>
      {chatId && <Chat />}
      <Footer />
    </div>
  );
}
