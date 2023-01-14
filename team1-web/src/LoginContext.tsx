import { useState, useCallback, createContext, useContext } from 'react';

export interface IUser {
  id: number;
  name: string;
  school: string;
  nickname: string;
  class: number;
}

type LoginProps = {
  children: React.ReactNode;
};

type TLoginContext = {
  authed: boolean;
  setAuthed: (x: boolean) => void;
  token: string | null;
  setToken: (x: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (x: string | null) => void;
  user: IUser | null;
  setUser: (x: IUser | null) => void;
};

const LoginContext = createContext<TLoginContext>({
  authed: false,
  setAuthed: (x: boolean) => {},
  token: null,
  setToken: (x: string | null) => {},
  refreshToken: null,
  setRefreshToken: (x: string | null) => {},
  user: null,
  setUser: (x: IUser | null) => {},
});

export function LoginProvider({ children }: LoginProps) {
  const [authed, sAuthed] = useState<boolean>(false);
  const setAuthed = useCallback((x: boolean) => sAuthed(x), []);
  const [token, sToken] = useState<string | null>(null);
  const setToken = useCallback((x: string | null) => sToken(x), []);
  const [refreshToken, sRefreshToken] = useState<string | null>(null);
  const setRefreshToken = useCallback((x: string | null) => sRefreshToken(x), []);
  const [user, sUser] = useState<IUser | null>(null);
  const setUser = useCallback((x: IUser | null) => sUser(x), []);
  return (
    <LoginContext.Provider
      value={{
        authed,
        setAuthed,
        token,
        setToken,
        refreshToken,
        setRefreshToken,
        user,
        setUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export const useLoginProvider = (): TLoginContext => useContext(LoginContext);
