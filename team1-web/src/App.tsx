import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import BoardLayout from './components/Layout/BoardLayout';
import BoardPage from './components/BoardPage';
import MyPage from './components/MyPage';
import Main from './components/Login/Main';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import { LoginProvider } from './LoginContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO: eslint, prettier 설정
// TODO: Tab이 띄어쓰기 2칸

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {/* TODO: home path 변경 */}
      <Route path='home' element={<Layout />}>
        <Route element={<BoardLayout />}>
          <Route index element={<Home />} />
          <Route path=':storeId' element={<BoardPage />} />
        </Route>
        <Route path='my' index element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </LoginProvider>
  );
}
