import { Button, Container, Icon } from '@components/ui';
import { SEO } from '@components/common';
import { ANCHORS, ROUTES } from '@constants/routes';
import { PAGE_SEO } from '@constants/seo';
import { useDocumentTitle } from '@hooks';
import styles from './NotFound.module.css';

/**
 * 404 fallback page with helpful navigation links.
 * Marked noindex so search engines skip it.
 */
function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <>
      <SEO
        title={PAGE_SEO.notFound.title}
        description={PAGE_SEO.notFound.description}
        noindex
        includeLocalBusiness={false}
      />
      <Container>
        <div className={styles.wrapper}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>This page went missing</h1>
          <p className={styles.text}>
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
            Here are some helpful links instead:
          </p>
          <div className={styles.actions}>
            <Button to={ROUTES.HOME} size="lg" iconLeft={<Icon name="arrow-left" size={18} />}>
              Back to home
            </Button>
            <Button to={ANCHORS.COLLECTIONS} size="lg" variant="outline">
              View collections
            </Button>
          </div>
          <nav className={styles.links} aria-label="Helpful links">
            <a href={ROUTES.FEATURES} className={styles.link}>Craftsmanship</a>
            <a href={ROUTES.ABOUT} className={styles.link}>About us</a>
            <a href={ROUTES.CONTACT} className={styles.link}>Contact</a>
          </nav>
        </div>
      </Container>
    </>
  );
}

export default NotFound;
