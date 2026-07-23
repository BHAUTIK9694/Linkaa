import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Spinner } from '@components/ui';
import StatusBadge from '@components/admin/StatusBadge';
import { submissionService } from '@services/adminService';
import { useAdminAuth } from '@contexts/AdminAuthContext';
import { ADMIN_ROUTES } from '@constants/routes';
import { useDocumentTitle } from '@hooks';
import { formatDate } from '@utils/format';
import styles from './AdminDashboard.module.css';

const STATUS_ORDER = ['new', 'in_progress', 'contacted', 'resolved', 'closed'];
const STATUS_LABELS = {
  total:       'Total',
  new:         'New',
  in_progress: 'In Progress',
  contacted:   'Contacted',
  resolved:    'Resolved',
  closed:      'Closed',
};

/**
 * Admin dashboard — stat cards and a recent submissions preview.
 */
function AdminDashboard() {
  useDocumentTitle('Dashboard · Admin');

  const { admin }              = useAdminAuth();
  const [stats, setStats]      = useState(null);
  const [recent, setRecent]    = useState([]);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState('');

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      submissionService.stats(),
      submissionService.list({ limit: 8 }),
    ])
      .then(([statsRes, listRes]) => {
        if (cancelled) return;
        setStats(statsRes.data?.stats ?? {});
        setRecent(listRes.data?.submissions ?? []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message ?? 'Failed to load dashboard data.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const statEntries = stats
    ? [
        ['total', stats.total ?? 0],
        ...STATUS_ORDER.map((s) => [s, stats[s] ?? 0]),
      ]
    : [];

  const hour        = new Date().getHours();
  const greeting    = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {greeting}, {admin?.name?.split(' ')[0] ?? 'Admin'}
        </h1>
        <p className={styles.subtitle}>Here&apos;s an overview of all contact submissions.</p>
      </div>

      {/* Stats */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-12)' }}>
          <Spinner size={32} label="Loading stats" />
        </div>
      ) : error ? (
        <p style={{ color: 'var(--color-text-muted)' }}>{error}</p>
      ) : (
        <div className={styles.statsGrid}>
          {statEntries.map(([key, value]) => (
            <div key={key} className={`${styles.statCard} ${key === 'new' ? styles.highlighted : ''}`}>
              <span className={styles.statLabel}>{STATUS_LABELS[key] ?? key}</span>
              <span className={styles.statValue}>{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Recent submissions */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent submissions</h2>
          <Button variant="outline" size="sm" to={ADMIN_ROUTES.SUBMISSIONS}>
            View all
          </Button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Subject / Preview</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className={styles.loadingRow}>
                  <td colSpan={6}><Spinner size={24} label="Loading" /></td>
                </tr>
              )}
              {!loading && error && (
                <tr className={styles.errorRow}>
                  <td colSpan={6}>Could not load submissions.</td>
                </tr>
              )}
              {!loading && !error && recent.length === 0 && (
                <tr className={styles.emptyRow}>
                  <td colSpan={6}>No submissions yet.</td>
                </tr>
              )}
              {!loading && !error && recent.map((row) => (
                <tr key={row.id}>
                  <td className={styles.nameCell}>{row.name}</td>
                  <td className={styles.emailCell}>{row.email}</td>
                  <td className={styles.preview}>{row.subject || row.message_preview}</td>
                  <td><StatusBadge status={row.status} /></td>
                  <td className={styles.dateCell}>{formatDate(row.submitted_at)}</td>
                  <td className={styles.actionCell}>
                    <Link
                      to={ADMIN_ROUTES.SUBMISSION_DETAIL.replace(':id', row.id)}
                      className={styles.viewBtn}
                    >
                      <Icon name="eye" size={13} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
