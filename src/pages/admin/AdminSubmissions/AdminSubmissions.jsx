import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Icon, Spinner } from '@components/ui';
import StatusBadge from '@components/admin/StatusBadge';
import { submissionService } from '@services/adminService';
import { ADMIN_ROUTES } from '@constants/routes';
import { useDocumentTitle } from '@hooks';
import { formatDate } from '@utils/format';
import { cn } from '@utils/classNames';
import styles from './AdminSubmissions.module.css';

const STATUS_OPTIONS = [
  { value: '',            label: 'All' },
  { value: 'new',         label: 'New' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'contacted',   label: 'Contacted' },
  { value: 'resolved',    label: 'Resolved' },
  { value: 'closed',      label: 'Closed' },
];

/** Maps interest values from the contact form dropdown to human labels. */
const INTEREST_LABELS = {
  commission: 'Custom commission',
  showroom: 'Visit the showroom',
  product: 'Product enquiry',
  general: 'General question',
};

function formatInterest(value) {
  if (!value) return '';
  return INTEREST_LABELS[value] || value;
}

/**
 * Admin submissions listing page with status filter and pagination.
 */
function AdminSubmissions() {
  useDocumentTitle('Submissions · Admin');

  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') ?? '';
  const currentPage  = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));

  const [submissions, setSubmissions] = useState([]);
  const [meta, setMeta]               = useState({ total: 0, page: 1, pages: 1, limit: 20 });
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');

  const load = (status, page) => {
    setLoading(true);
    setError('');
    submissionService
      .list({ status: status || undefined, page, limit: 20 })
      .then((res) => {
        setSubmissions(res.data?.submissions ?? []);
        setMeta(res.data?.meta ?? meta);
      })
      .catch((err) => setError(err.message ?? 'Failed to load submissions.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(statusFilter, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, currentPage]);

  const setFilter = (value) => {
    setSearchParams(value ? { status: value } : {});
  };

  const setPage = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(page));
      return next;
    });
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Submissions</h1>
        <p className={styles.subtitle}>
          {meta.total > 0
            ? `${meta.total} total submission${meta.total !== 1 ? 's' : ''}`
            : 'No submissions yet'}
        </p>
      </div>

      {/* Status filter tabs */}
      <div className={styles.filters}>
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilter(opt.value)}
            className={cn(styles.filterBtn, statusFilter === opt.value && styles.active)}
          >
            {opt.label}
          </button>
        ))}

        <button
          type="button"
          className={styles.refreshBtn}
          onClick={() => load(statusFilter, currentPage)}
          aria-label="Refresh list"
        >
          <Icon name="refresh" size={15} />
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Interest / Preview</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr className={styles.loadingRow}>
                <td colSpan={8}><Spinner size={24} label="Loading submissions" /></td>
              </tr>
            )}
            {!loading && error && (
              <tr className={styles.errorRow}>
                <td colSpan={8}>{error}</td>
              </tr>
            )}
            {!loading && !error && submissions.length === 0 && (
              <tr className={styles.emptyRow}>
                <td colSpan={8}>
                  <Icon name="inbox" size={36} aria-hidden="true" className={styles.emptyIcon} />
                  <p>No submissions found{statusFilter ? ` for status "${statusFilter}"` : ''}.</p>
                </td>
              </tr>
            )}
            {!loading && !error && submissions.map((row) => (
              <tr key={row.id}>
                <td className={styles.idCell}>#{row.id}</td>
                <td className={styles.nameCell}>{row.name}</td>
                <td className={styles.emailCell}>{row.email}</td>
                <td className={styles.phoneCell}>{row.phone || '—'}</td>
                <td className={styles.preview}>{formatInterest(row.subject) || row.message_preview}</td>
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

      {/* Pagination */}
      {!loading && !error && meta.pages > 1 && (
        <div className={styles.pagination}>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setPage(currentPage - 1)}
            iconLeft={<Icon name="chevron-left" size={14} />}
          >
            Previous
          </Button>

          <span className={styles.pageInfo}>
            Page {currentPage} of {meta.pages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= meta.pages}
            onClick={() => setPage(currentPage + 1)}
            iconRight={<Icon name="chevron-right" size={14} />}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default AdminSubmissions;
