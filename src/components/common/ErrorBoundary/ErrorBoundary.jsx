import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

/**
 * App-level error boundary. Catches render errors in the subtree and shows a
 * recoverable fallback instead of a blank screen. Report to your monitoring
 * service (e.g. Sentry) inside componentDidCatch in production.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
    // TODO: report to monitoring service in production.
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper} role="alert">
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.text}>
            An unexpected error occurred. Try reloading — if it keeps happening, contact support.
          </p>
          <button type="button" className={styles.button} onClick={this.handleReload}>
            Reload app
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
