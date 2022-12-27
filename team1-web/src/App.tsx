import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Board from './components/Board';

// TODO: eslint, prettier 설정
// TODO: npm / yarn 통일
// TODO: Tab이 띄어쓰기 2칸

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Board />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='temp' index element={<Home />} />{' '}
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
