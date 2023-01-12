import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector, RootState } from '../../store';

export default function Layout() {
  // TODO: 아래 auth 내용 처리 App.tsx Route 단계에서 처리
  const token = useAppSelector((state: RootState) => state.session.token);
  const navigate = useNavigate();
  // useLayoutEffect(() => {
  //   if (!token) {
  //     navigate('/Login');
  //     toast.error('잘못된 접근입니다.');
  //   }
  // }, [navigate, token]);
  return (
    <div className='app'>
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}
