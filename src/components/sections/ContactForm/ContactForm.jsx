import { useState } from 'react';
import { Button, Card, Input, Spinner } from '@components/ui';
import { contactService } from '@services/contactService';
import { isEmail, isRequired, minLength } from '@utils/validators';
import styles from './ContactForm.module.css';

const INITIAL = { name: '', email: '', message: '' };

/**
 * Accessible, validated contact form. Talks to the API only through the
 * service layer and surfaces field-level and form-level status.
 */
function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const validate = () => {
    const next = {};
    if (!isRequired(values.name)) next.name = 'Please enter your name.';
    if (!isEmail(values.email)) next.email = 'Please enter a valid email address.';
    if (!minLength(values.message, 10)) next.message = 'Message must be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      await contactService.submit(values);
      setStatus('success');
      setValues(INITIAL);
    } catch {
      setStatus('error');
    }
  };

  return (
    <Card padding="lg" className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
          required
        />
        <Input
          label="Work email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Input
          label="How can we help?"
          name="message"
          multiline
          rows={5}
          value={values.message}
          onChange={handleChange}
          error={errors.message}
          required
        />

        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? <Spinner size={18} label="Sending" /> : 'Send message'}
        </Button>

        <div aria-live="polite" className={styles.status}>
          {status === 'success' && (
            <p className={styles.success}>Thanks! We&apos;ll be in touch within one business day.</p>
          )}
          {status === 'error' && (
            <p className={styles.error}>Something went wrong. Please try again.</p>
          )}
        </div>
      </form>
    </Card>
  );
}

export default ContactForm;
