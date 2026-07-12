import { Button, Container, Icon } from '@components/ui';
import { ROUTES } from '@constants/routes';
import { useDocumentTitle } from '@hooks';
import styles from './NotFound.module.css';

/**
 * 404 fallback page.
 */
function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <Container>
      <div className={styles.wrapper}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page went missing</h1>
        <p className={styles.text}>
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button to={ROUTES.HOME} size="lg" iconLeft={<Icon name="arrow-right" size={18} />}>
          Back to home
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;
