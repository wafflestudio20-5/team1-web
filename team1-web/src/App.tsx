import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Header/Layout';
import Board from './components/Header/BoardListBoard';
import MyPage from './components/MyPage';

// TODO: eslint, prettier 설정
// TODO: npm / yarn 통일
// TODO: Tab이 띄어쓰기 2칸
// TODO: prettier 설정 중 작은 따옴표, 큰 따옴표 설정 통일

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Board />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='my' index element={<MyPage/>} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      {/* TODO: <ToastContainer /> */}
    </BrowserRouter>
  );
}
