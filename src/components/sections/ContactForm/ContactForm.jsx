import { useState } from 'react';
import { Button, Card, Icon, Input, Spinner } from '@components/ui';
import { contactService } from '@services/contactService';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '@constants/countryCodes';
import { ROUTES } from '@constants/routes';
import { isEmail, isRequired, minLength } from '@utils/validators';
import styles from './ContactForm.module.css';

const INITIAL = { name: '', email: '', countryCode: DEFAULT_COUNTRY_CODE, phone: '', interest: '', message: '' };

const INTEREST_OPTIONS = [
  { value: '', label: 'What are you interested in?' },
  { value: 'commission', label: 'Custom commission' },
  { value: 'showroom', label: 'Visit the showroom' },
  { value: 'product', label: 'Product enquiry' },
  { value: 'general', label: 'General question' },
];

/**
 * Accessible, validated contact form with country-code phone dropdown.
 * Full-width stacked layout for simplicity. Phone number is required.
 * Collects name, email, phone (with country code), interest area, and message.
 */
function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const validate = () => {
    const next = {};
    if (!isRequired(values.name)) next.name = 'Please enter your name.';
    if (!isEmail(values.email)) next.email = 'Please enter a valid email address.';
    if (!isRequired(values.phone)) {
      next.phone = 'Please enter your phone number.';
    } else if (!/^[\d\s()-]{6,15}$/.test(values.phone.trim())) {
      next.phone = 'Please enter a valid phone number.';
    }
    if (!minLength(values.message, 10)) next.message = 'Message must be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      const payload = {
        ...values,
        phone: `${values.countryCode} ${values.phone}`,
        subject: values.interest,
      };
      await contactService.submit(payload);
      setStatus('success');
      setValues(INITIAL);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Card padding="lg" className={styles.card}>
        <div className={styles.successState}>
          <div className={styles.successIcon}>
            <Icon name="check" size={32} />
          </div>
          <h3 className={styles.successTitle}>Message sent!</h3>
          <p className={styles.successText}>
            We&apos;ll get back to you within one business day. In the meantime, feel free to
            explore our collections or message us on WhatsApp for a quicker response.
          </p>
          <Button variant="outline" to={ROUTES.HOME} size="sm">
            Explore collections
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg" className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Full name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
          required
        />

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

        {/* Phone with country code */}
        <div className={styles.phoneGroup}>
          <label className={styles.phoneLabel} htmlFor="phone-input">
            Phone number <span className={styles.required}>*</span>
          </label>
          <div className={styles.phoneRow}>
            <select
              name="countryCode"
              value={values.countryCode}
              onChange={handleChange}
              className={styles.countrySelect}
              aria-label="Country calling code"
            >
              {COUNTRY_CODES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
            <input
              id="phone-input"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              className={`${styles.phoneInput} ${errors.phone ? styles.phoneInvalid : ''}`}
              placeholder="98765 43210"
              autoComplete="tel-national"
              required
              aria-invalid={errors.phone ? 'true' : undefined}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
          </div>
          {errors.phone && (
            <span id="phone-error" className={styles.phoneError} role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        {/* Interest dropdown */}
        <div className={styles.phoneGroup}>
          <label className={styles.phoneLabel} htmlFor="interest-select">
            I&apos;m interested in
          </label>
          <select
            id="interest-select"
            name="interest"
            value={values.interest}
            onChange={handleChange}
            className={styles.interestSelect}
          >
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

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

        <Button type="submit" size="lg" fullWidth disabled={status === 'submitting'}>
          {status === 'submitting' ? <Spinner size={18} label="Sending" /> : 'Send message'}
        </Button>

        <p className={styles.responseTime}>
          <Icon name="clock" size={14} />
          We reply within 24 hours
        </p>

        <div aria-live="polite" className={styles.status}>
          {status === 'error' && (
            <p className={styles.error}>Something went wrong. Please try again.</p>
          )}
        </div>
      </form>
    </Card>
  );
}

export default ContactForm;
