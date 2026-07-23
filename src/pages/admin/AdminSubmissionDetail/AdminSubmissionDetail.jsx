import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Icon, Spinner } from '@components/ui';
import StatusBadge from '@components/admin/StatusBadge';
import { submissionService } from '@services/adminService';
import { ADMIN_ROUTES } from '@constants/routes';
import { useDocumentTitle } from '@hooks';
import { formatDateLong } from '@utils/format';
import styles from './AdminSubmissionDetail.module.css';

const STATUS_OPTIONS = [
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
  return INTEREST_LABELS[value] || value || '—';
}

/**
 * Admin submission detail page.
 * Displays full submission data and allows status + admin notes editing.
 */
function AdminSubmissionDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error

  // Edit state
  const [status, setStatus]     = useState('');
  const [notes, setNotes]       = useState('');

  useDocumentTitle(
    submission ? `Submission #${submission.id} · Admin` : 'Loading… · Admin'
  );

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    submissionService
      .get(Number(id))
      .then((res) => {
        const s = res.data?.submission;
        setSubmission(s);
        setStatus(s?.status ?? 'new');
        setNotes(s?.admin_notes ?? '');
      })
      .catch((err) => setError(err.message ?? 'Failed to load submission.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      const res = await submissionService.update(Number(id), {
        status,
        admin_notes: notes,
      });
      const updated = res.data?.submission;
      setSubmission(updated);
      setStatus(updated?.status ?? status);
      setNotes(updated?.admin_notes ?? notes);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      setSaveStatus('error');
      setError(err.message ?? 'Failed to save changes.');
    }
  };

  if (loading) {
    return (
      <div className={styles.center}>
        <Spinner size={32} label="Loading submission" />
      </div>
    );
  }

  if (error && !submission) {
    return (
      <div className={styles.center}>
        <p className={styles.errorText}>{error}</p>
        <Button variant="outline" size="sm" onClick={() => navigate(ADMIN_ROUTES.SUBMISSIONS)}>
          Back to submissions
        </Button>
      </div>
    );
  }

  const isDirty =
    submission && (status !== submission.status || notes !== (submission.admin_notes ?? ''));

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link to={ADMIN_ROUTES.SUBMISSIONS} className={styles.breadcrumbLink}>
          <Icon name="arrow-left" size={14} />
          Submissions
        </Link>
        <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
        <span>#{submission?.id}</span>
      </nav>

      <div className={styles.grid}>
        {/* Left: submission details */}
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Submission details</h2>
              <StatusBadge status={submission?.status} />
            </div>

            <dl className={styles.dl}>
              <div className={styles.dlRow}>
                <dt><Icon name="user" size={14} aria-hidden="true" />Name</dt>
                <dd>{submission?.name}</dd>
              </div>
              <div className={styles.dlRow}>
                <dt><Icon name="mail" size={14} aria-hidden="true" />Email</dt>
                <dd>
                  <a href={`mailto:${submission?.email}`} className={styles.link}>
                    {submission?.email}
                  </a>
                </dd>
              </div>
              <div className={styles.dlRow}>
                <dt><Icon name="phone" size={14} aria-hidden="true" />Phone</dt>
                <dd>
                  {submission?.phone
                    ? <a href={`tel:${submission.phone}`} className={styles.link}>{submission.phone}</a>
                    : <span className={styles.empty}>—</span>
                  }
                </dd>
              </div>
              {submission?.subject && (
                <div className={styles.dlRow}>
                  <dt><Icon name="message-square" size={14} aria-hidden="true" />Interest</dt>
                  <dd>{formatInterest(submission.subject)}</dd>
                </div>
              )}
              <div className={styles.dlRow}>
                <dt><Icon name="clock" size={14} aria-hidden="true" />Submitted</dt>
                <dd>{submission?.submitted_at ? formatDateLong(submission.submitted_at) : '—'}</dd>
              </div>
              {submission?.updated_at !== submission?.submitted_at && (
                <div className={styles.dlRow}>
                  <dt><Icon name="edit" size={14} aria-hidden="true" />Last updated</dt>
                  <dd>
                    {formatDateLong(submission?.updated_at)}
                    {submission?.updated_by_name && (
                      <span className={styles.updatedBy}> by {submission.updated_by_name}</span>
                    )}
                  </dd>
                </div>
              )}
            </dl>

            <div className={styles.messageBlock}>
              <p className={styles.messageLabel}>Message</p>
              <p className={styles.messageText}>{submission?.message}</p>
            </div>
          </div>
        </div>

        {/* Right: admin panel */}
        <div className={styles.rightCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Update submission</h2>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="status-select">Status</label>
              <select
                id="status-select"
                className={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="admin-notes">
                Admin notes
                <span className={styles.labelHint}>Only visible to admins</span>
              </label>
              <textarea
                id="admin-notes"
                className={styles.textarea}
                rows={6}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes about this submission…"
              />
            </div>

            {saveStatus === 'error' && error && (
              <p className={styles.errorText} role="alert">{error}</p>
            )}

            <Button
              size="md"
              fullWidth
              onClick={handleSave}
              disabled={saveStatus === 'saving' || !isDirty}
            >
              {saveStatus === 'saving' ? (
                <Spinner size={16} label="Saving" />
              ) : saveStatus === 'saved' ? (
                <>
                  <Icon name="check" size={14} />
                  Saved
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSubmissionDetail;
