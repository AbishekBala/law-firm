import { useCallback, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const SESSION_KEY = 'abf_admin_session_v1';
const ADMIN_PASSWORD = 'admin@123'; // Local-only default. Replace with real auth in production.

export const isAdminAuthenticated = () => {
  try {
    return localStorage.getItem(SESSION_KEY) === '1';
  } catch (e) {
    return false;
  }
};

export const signInAdmin = (password: string) => {
  if (password === ADMIN_PASSWORD) {
    try {
      localStorage.setItem(SESSION_KEY, '1');
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};

export const signOutAdmin = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    // ignore
  }
};

export const useAdminAuth = () => {
  const [authed, setAuthed] = useState<boolean>(isAdminAuthenticated());

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
  }, []);

  const signIn = useCallback((password: string) => {
    const ok = signInAdmin(password);
    setAuthed(ok);
    return ok;
  }, []);

  const signOut = useCallback(() => {
    signOutAdmin();
    setAuthed(false);
  }, []);

  return { isAuthenticated: authed, signIn, signOut };
};

export const AdminPrivateRoute = ({ children }: { children: JSX.Element }) => {
  const authed = isAdminAuthenticated();
  const location = useLocation();

  if (!authed) {
    return <Navigate to="/admin/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default null as unknown as void;
