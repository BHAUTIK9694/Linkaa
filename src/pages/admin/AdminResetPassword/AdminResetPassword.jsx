import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, Spinner } from '@components/ui';
import { authService } from '@services/adminService';
import { ADMIN_ROUTES } from '@constants/routes';
import { useDocumentTitle } from '@hooks';
import styles from './AdminResetPassword.module.css';

/**
 * Reset password page. Reads ?token= from the URL query string.
 * Validates the new password and submits to the API.
 */
function AdminResetPassword() {
  useDocumentTitle('Reset Password · Admin');

  const [searchParams] = useSearchParams();
  const navigate        = useNavigate();
  const [values, setValues]     = useState({ password: '', confirm: '' });
  const [errors, setErrors]     = useState({});
  const [formError, setFormError] = useState('');
  const [status, setStatus]     = useState('idle');

  const token = searchParams.get('token') ?? '';

  useEffect(() => {
    if (!token) {
      setFormError('No reset token found. Please request a new link.');
    }
  }, [token]);

  const validate = () => {
    const next = {};
    if (values.password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }
    if (values.password !== values.confirm) {
      next.confirm = 'Passwords do not match.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setFormError('');
    try {
      await authService.resetPassword({ token, password: values.password, confirm: values.confirm });
      setStatus('success');
      setTimeout(() => navigate(ADMIN_ROUTES.LOGIN, { replace: true }), 2500);
    } catch (err) {
      setFormError(err.message ?? 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Reset password</h1>
          <p className={styles.subtitle}>Enter your new password below.</p>
        </div>

        {status === 'success' ? (
          <div className={styles.successBox}>
            <p className={styles.successText}>
              Password updated successfully. Redirecting you to sign in…
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Input
              label="New password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
              required
              hint="At least 8 characters"
            />
            <Input
              label="Confirm new password"
              name="confirm"
              type="password"
              value={values.confirm}
              onChange={handleChange}
              error={errors.confirm}
              autoComplete="new-password"
              required
            />

            {formError && (
              <p className={styles.formError} role="alert">
                {formError}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={status === 'submitting' || !token}
            >
              {status === 'submitting' ? <Spinner size={18} label="Saving" /> : 'Reset password'}
            </Button>
          </form>
        )}

        <div className={styles.footer}>
          <Link to={ADMIN_ROUTES.LOGIN} className={styles.backLink}>
            ← Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminResetPassword;
