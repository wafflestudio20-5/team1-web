import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import BoardLayout from './components/Layout/BoardLayout';
import BoardPage from './components/BoardPage';
import MyPage from './components/MyPage';
import Main from './components/Login/Main';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Kakao from './components/Login/Oauth/Kakao';
import Google from './components/Login/Oauth/Google';
import NewKakao from './components/Login/Oauth/NewKakao';
import ChangePasswordPage from './components/MyPage/ChangePasswordPage';
import ChangeNicknamePage from './components/MyPage/ChangeNicknamePage';
import { useAppSelector, RootState } from './store';
import { LoginProvider } from './LoginContext';
import { toast } from 'react-toastify';

function InValidateURL() {
  return (
    // TODO: 추후 디자인
    <>
      <h1>404. That’s an error.</h1>
      <h2>The requested URL /dwdwdw was not found on this server. That’s all we know.</h2>
    </>
  );
}

function LoginForRedirectPage({ redirectPath }: { redirectPath: string }) {
  const params = useParams();
  const paramPath = Object.values(params).join('/');
  const [searchParams] = useSearchParams();
  const searchParamsPath = searchParams.toString();
  return (
    <Navigate
      to={`/login?redirect=${redirectPath}${params ? '/' + paramPath : ''}${
        searchParamsPath ? '?' + searchParamsPath : ''
      }`}
    />
  );
}

function AppRoutes() {
  // TODO: 로그인 여부 확인 후 redirect 작업
  const token = useAppSelector((state: RootState) => state.session.token);
  const redirectLoginPageIfNotLoginned = (page: JSX.Element, redirectPath: string) =>
    token ? page : <LoginForRedirectPage redirectPath={redirectPath} />;

  const checkIfLoginned = (page: JSX.Element) => {
    if (token) {
      // TODO: login 후 navigate 전에 toast 뜨는 문제 해결
      // toast.error('로그아웃 후 이용 가능합니다.');
      return <Navigate to='' />;
    } else return page;
  };

  return (
    <Routes>
      {token || <Route path='' element={<Main />} />}
      <Route element={<Layout />}>
        <Route element={<BoardLayout />}>
          <Route path='' element={<Home />} />
          <Route path=':storeId' element={redirectLoginPageIfNotLoginned(<BoardPage />, '')} />
        </Route>
        <Route path='my'>
          <Route index element={redirectLoginPageIfNotLoginned(<MyPage />, '/my')} />
          <Route
            path='password'
            element={redirectLoginPageIfNotLoginned(<ChangePasswordPage />, '/my/password')}
          />
          <Route
            path='nickname'
            element={redirectLoginPageIfNotLoginned(<ChangeNicknamePage />, '/my/nickname')}
          />
        </Route>
      </Route>

      <Route path='/login' element={checkIfLoginned(<Login />)} />
      <Route path='/oauth/kakao/callback' element={checkIfLoginned(<Kakao />)} />
      <Route path='/oauth/google/callback' element={checkIfLoginned(<Google />)} />
      <Route path='/register' element={checkIfLoginned(<Register />)} />
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
