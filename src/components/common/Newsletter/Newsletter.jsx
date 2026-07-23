import { useState } from 'react';
import { Button, Icon } from '@components/ui';
import styles from './Newsletter.module.css';

/**
 * Compact newsletter signup — email capture for workshop updates.
 * Designed to sit in the footer or a secondary section.
 *
 * @param {object} props
 * @param {string} [props.title] - headline
 * @param {string} [props.subtitle] - supporting text
 */
function Newsletter({
  title = 'Get workshop updates',
  subtitle = 'New collections, behind-the-scenes, and care tips. No spam, unsubscribe anytime.',
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    // Simulate subscription (replace with real endpoint when available)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  }

  if (status === 'success') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.success}>
          <Icon name="check" size={20} />
          <p>You&apos;re subscribed! We&apos;ll be in touch.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className={styles.input}
          aria-label="Email address"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className={styles.btn}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending…' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
}

export default Newsletter;
