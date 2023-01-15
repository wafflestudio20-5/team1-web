import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import BoardLayout from './components/Layout/BoardLayout';
import BoardPage from './components/BoardPage';
import MyPage from './components/MyPage';
import Main from './components/Login/Main';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Kakao from './components/Login/Oauth/Kakao';
import NewKakao from './components/Login/Oauth/NewKakao';
import { useAppSelector, RootState } from './store';
import { LoginProvider } from './LoginContext';

function InValidateURL() {
  // TODO: 추후 디자인
  return (
    <>
      <h1>404. That’s an error.</h1>
      <h2>
        The requested URL /dwdwdw was not found on this server. That’s all we
        know.
      </h2>
    </>
  );
}

function AppRoutes() {
  // TODO: 로그인 여부 확인 후 redirect 작업
  const token = useAppSelector((state: RootState) => state.session.token);
  return (
    <Routes>
      {token || <Route path='' element={<Main />} />}
      <Route element={<Layout />}>
        <Route element={<BoardLayout />}>
          {token && <Route index element={<Home />} />}
          <Route path=':storeId' element={<BoardPage />} />
        </Route>
        <Route path='my' index element={<MyPage />} />
      </Route>
      {/* TODO: 로그인되어있을 시 Login 페이지 redirect */}
      <Route path='/login' element={<Login />} />
      <Route path='/oauth/kakao/callback' element={<Kakao />} />
      <Route path='/register' element={<Register />} />
      {/* TODO: home path 변경 */}
      <Route path='*' element={<InValidateURL />} />
    </Routes>
  );
}

export default function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LoginProvider>
  );
}
