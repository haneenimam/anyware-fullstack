import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import type { RootState } from '../app/store';

export default function requireAuth<P extends object>(Component: React.ComponentType<P>) {
  return function Guarded(props: P) {
    const isAuthed = useSelector((s: RootState) => s.auth.isAuthenticated);
    const location = useLocation();
    if (!isAuthed) return <Navigate to="/" replace state={{ from: location }} />;
    return <Component {...props} />;
  };
}
