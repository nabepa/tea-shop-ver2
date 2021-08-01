import React, {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext({});

const tokenRef = createRef();

export function AuthProvider({ authService, authErrorEventBus, children }) {
  const [user, setUser] = useState(undefined);

  useImperativeHandle(tokenRef, () => (user ? user.token : undefined));

  useEffect(() => {
    authErrorEventBus.listen((error) => {
      console.log(error);
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.me().then(setUser).catch(console.error);
  }, [authService]);

  const register = useCallback(
    async (firstName, lastName, email, password) =>
      authService //
        .register(firstName, lastName, email, password)
        .then(setUser),
    [authService]
  );

  const signin = useCallback(
    async (email, password) =>
      authService //
        .signin(email, password)
        .then(setUser),
    [authService]
  );

  const signout = useCallback(
    async () =>
      authService //
        .signout()
        .then(() => setUser(undefined)),
    [authService]
  );

  const context = useMemo(
    () => ({ user, register, signin, signout }),
    [user, register, signin, signout]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export class AuthErrorEventBus {
  listen(callback) {
    this.callback = callback;
  }
  notify(error) {
    this.callback(error);
  }
}

export default AuthContext;
export const fetchToken = () => tokenRef.current;
export const useAuth = () => useContext(AuthContext);
