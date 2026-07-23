import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Spinner } from '@components/ui';
import { authService } from '@services/adminService';
import { ADMIN_ROUTES } from '@constants/routes';
import { isEmail } from '@utils/validators';
import { useDocumentTitle } from '@hooks';
import styles from './AdminForgotPassword.module.css';

/**
 * Forgot password page. Requests a reset token from the API.
 * In development the API returns the token in the response for easy testing.
 */
function AdminForgotPassword() {
  useDocumentTitle('Forgot Password · Admin');

  const [email, setEmail]         = useState('');
  const [emailError, setEmailError] = useState('');
  const [status, setStatus]         = useState('idle'); // idle | submitting | success | error
  const [message, setMessage]       = useState('');
  const [devToken, setDevToken]     = useState(''); // only in development

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setStatus('submitting');

    try {
      const res = await authService.forgotPassword({ email });
      setMessage(res.data?.message ?? 'Check your inbox for a reset link.');
      if (res.data?.dev_token) {
        setDevToken(res.data.dev_token);
      }
      setStatus('success');
    } catch (err) {
      setMessage(err.message ?? 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Forgot password</h1>
          <p className={styles.subtitle}>
            Enter the email address associated with your admin account and we&apos;ll send you a
            reset link.
          </p>
        </div>

        {status === 'success' ? (
          <div className={styles.successBox}>
            <p className={styles.successText}>{message}</p>
            {devToken && (
              <div className={styles.devBox}>
                <p className={styles.devLabel}>Development only — reset token:</p>
                <code className={styles.devToken}>{devToken}</code>
                <p className={styles.devNote}>
                  Use this token at{' '}
                  <Link to={ADMIN_ROUTES.RESET_PASSWORD} className={styles.link}>
                    Reset Password
                  </Link>
                  . This block is hidden in production.
                </p>
              </div>
            )}
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Input
              label="Email address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              error={emailError}
              autoComplete="email"
              required
            />

            {status === 'error' && (
              <p className={styles.formError} role="alert">
                {message}
              </p>
            )}

            <Button type="submit" size="lg" fullWidth disabled={status === 'submitting'}>
              {status === 'submitting' ? <Spinner size={18} label="Sending" /> : 'Send reset link'}
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

export default AdminForgotPassword;
