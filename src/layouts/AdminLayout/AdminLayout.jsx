import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAdminAuth } from '@contexts/AdminAuthContext';
import { Icon } from '@components/ui';
import { ADMIN_ROUTES } from '@constants/routes';
import { cn } from '@utils/classNames';
import styles from './AdminLayout.module.css';

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',    to: ADMIN_ROUTES.DASHBOARD,    icon: 'chart',    end: true },
  { id: 'submissions',  label: 'Submissions',  to: ADMIN_ROUTES.SUBMISSIONS,  icon: 'inbox' },
];

/**
 * Admin panel shell. Provides a fixed sidebar, top bar, and <Outlet />.
 * Redirects unauthenticated requests via the RequireAdminAuth wrapper.
 */
function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ADMIN_ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className={styles.shell}>
      {/* Prevent admin pages from being indexed */}
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Livantaa</span>
          <span className={styles.brandSub}>Admin</span>
        </div>

        <nav className={styles.nav} aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.end}
              className={({ isActive }) => cn(styles.navLink, isActive && styles.active)}
            >
              <Icon name={item.icon} size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.adminInfo}>
            <span className={styles.adminAvatar} aria-hidden="true">
              {admin?.name?.[0]?.toUpperCase() ?? 'A'}
            </span>
            <div className={styles.adminMeta}>
              <span className={styles.adminName}>{admin?.name ?? 'Admin'}</span>
              <span className={styles.adminEmail}>{admin?.email ?? ''}</span>
            </div>
          </div>
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={handleLogout}
            aria-label="Sign out"
          >
            <Icon name="logout" size={18} />
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={styles.main}>
        <main id="admin-main" className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
