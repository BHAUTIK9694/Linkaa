import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from '@components/ui';
import { useAdminAuth } from '@contexts/AdminAuthContext';
import { ADMIN_ROUTES } from '@constants/routes';

/**
 * Route guard. Redirects unauthenticated users to the admin login page.
 * Shows a loading spinner while the session check is in flight.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
function RequireAdminAuth({ children }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Spinner size={32} label="Checking session" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ADMIN_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAdminAuth;
