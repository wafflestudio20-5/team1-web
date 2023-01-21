import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector, RootState } from '../../store';

export default function Layout() {
  return (
    <div className='app'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
