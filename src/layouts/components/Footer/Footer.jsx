import { Link } from 'react-router-dom';
import { Container, Icon, Logo } from '@components/ui';
import { FOOTER_NAV } from '@constants/navigation';
import { ROUTES } from '@constants/routes';
import { SITE, SOCIAL_LINKS } from '@constants/site';
import styles from './Footer.module.css';

/**
 * Global site footer: brand blurb, grouped navigation, social links, legal bar.
 */
function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link to={ROUTES.HOME} aria-label={`${SITE.name} home`} className={styles.brand}>
              <Logo height={30} />
            </Link>
            <p className={styles.blurb}>{SITE.description}</p>
            <ul className={styles.social}>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon name={social.id} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.navGrid} aria-label="Footer">
            {FOOTER_NAV.map((group) => (
              <div key={group.id} className={styles.navGroup}>
                <h3 className={styles.navTitle}>{group.title}</h3>
                <ul className={styles.navList}>
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <Link to={link.to} className={styles.navLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {SITE.year} {SITE.name}. All rights reserved.
          </p>
          <p className={styles.contact}>
            <a href={`mailto:${SITE.email}`} className={styles.navLink}>
              {SITE.email}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
