import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";

// TODO: eslint, prettier 설정
// TODO: npm / yarn 통일

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
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
