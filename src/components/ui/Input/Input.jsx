import { forwardRef, useId } from 'react';
import { cn } from '@utils/classNames';
import styles from './Input.module.css';

/**
 * Accessible text input with label, hint, and error message wiring.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.hint]
 * @param {string} [props.error]
 * @param {boolean} [props.multiline=false] - render a textarea instead
 * @param {number} [props.rows=4] - rows when multiline
 * @param {string} [props.className]
 */
const Input = forwardRef(function Input(
  { label, hint, error, multiline = false, rows = 4, className, id, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const Field = multiline ? 'textarea' : 'input';

  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <Field
        ref={ref}
        id={inputId}
        rows={multiline ? rows : undefined}
        className={cn(styles.control, error && styles.invalid)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint && !error && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

export default Input;
