import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ onlyAuth, user, children }) => {
  const location = useLocation();

  if (!onlyAuth && user?.email) {
    const from = location.state?.from || { pathname: '/movies' };
    return <Navigate to={from} replace />;
  }

  if (onlyAuth && !user?.email) {
    return (
      <Navigate
        to={{ pathname: '/signin' }}
        state={{ from: location }}
        replace
      />
    );
  }
  return children;
};
