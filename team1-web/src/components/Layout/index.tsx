import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
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
