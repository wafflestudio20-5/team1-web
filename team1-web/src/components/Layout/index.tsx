import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useEffect } from 'react';
import { useLoginProvider } from '../../LoginContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Layout() {
  // TODO: 아래 auth 내용 처리 App.tsx Route 단계에서 처리
  const { token } = useLoginProvider();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(token);
    if (!token) {
      navigate('/Login');
      toast.error('잘못된 접근입니다.');
    }
  }, [token]);
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
