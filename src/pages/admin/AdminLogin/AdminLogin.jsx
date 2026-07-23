import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Input, Spinner } from '@components/ui';
import { useAdminAuth } from '@contexts/AdminAuthContext';
import { ADMIN_ROUTES } from '@constants/routes';
import { isEmail, isRequired } from '@utils/validators';
import { useDocumentTitle } from '@hooks';
import styles from './AdminLogin.module.css';

/**
 * Admin login page. Authenticates via POST /api/admin/auth/login.
 */
function AdminLogin() {
  useDocumentTitle('Admin Login');

  const { login }       = useAdminAuth();
  const navigate         = useNavigate();
  const [values, setValues]   = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const next = {};
    if (!isEmail(values.email)) next.email = 'Please enter a valid email address.';
    if (!isRequired(values.password)) next.password = 'Password is required.';
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

    setSubmitting(true);
    setFormError('');
    try {
      await login(values);
      navigate(ADMIN_ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      setFormError(err.message ?? 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Livantaa Admin</h1>
          <p className={styles.subtitle}>Sign in to your admin account</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            label="Email address"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
            required
          />

          <div className={styles.passwordField}>
            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {formError && (
            <p className={styles.formError} role="alert">
              {formError}
            </p>
          )}

          <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? <Spinner size={18} label="Signing in" /> : 'Sign in'}
          </Button>
        </form>

        <div className={styles.footer}>
          <Link to={ADMIN_ROUTES.FORGOT_PASSWORD} className={styles.forgotLink}>
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
