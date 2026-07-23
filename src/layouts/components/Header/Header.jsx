import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Icon, Logo } from '@components/ui';
import { NAV_LINKS } from '@constants/navigation';
import { ROUTES } from '@constants/routes';
import { SITE } from '@constants/site';
import { useDisclosure, useFocusTrap, useScrollPosition } from '@hooks';
import { cn } from '@utils/classNames';
import styles from './Header.module.css';

/** Home-based links (root or an in-page hash) must match exactly, not as a prefix. */
const isHomeLink = (to) => to === ROUTES.HOME || to.startsWith('/#');

/**
 * Sticky site header with responsive navigation.
 * Features a hairline utility bar on desktop, editorial nav with index numbers,
 * and a full-screen typographic drawer on mobile with backdrop overlay and
 * focus trap for accessibility.
 */
function Header() {
  const isScrolled = useScrollPosition(8);
  const { isOpen, toggle, close } = useDisclosure(false);
  const drawerRef = useRef(null);

  useFocusTrap(drawerRef, isOpen, { onEscape: close });

  return (
    <header className={cn(styles.header, isScrolled && styles.scrolled)}>
      {/* Utility strip — desktop only */}
      <Container>
        <div className={styles.utilityBar} aria-hidden="true">
          <div className={styles.utilityTagline}>
            <span className={styles.utilityDot} />
            <span>Handcrafted in Rajkot, Gujarat</span>
          </div>
          <div className={styles.utilityContact}>
            <a href={`tel:${SITE.phone}`} className={styles.utilityLink}>
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className={styles.utilityLink}>
              {SITE.email}
            </a>
          </div>
        </div>
      </Container>

      {/* Main navigation bar */}
      <Container>
        <div className={styles.bar}>
          <NavLink to={ROUTES.HOME} className={styles.brand} aria-label={`${SITE.name} home`}>
            <Logo height={28} />
          </NavLink>

          <nav className={styles.desktopNav} aria-label="Primary">
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.id}
                to={link.to}
                end={isHomeLink(link.to)}
                className={({ isActive }) => cn(styles.navLink, isActive && styles.active)}
              >
                <span className={styles.navIndex}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <Button size="sm" to={ROUTES.CONTACT} iconRight={<Icon name="arrow-right" size={14} />}>
              Get a free quote
            </Button>
          </div>

          <button
            type="button"
            className={styles.menuToggle}
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={isOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </Container>

      {/* Mobile nav backdrop */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Mobile nav drawer */}
      <div
        ref={drawerRef}
        id="mobile-nav"
        className={cn(styles.mobileNav, isOpen && styles.mobileOpen)}
        hidden={!isOpen}
      >
        <Container>
          <nav className={styles.mobileNavInner} aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                end={isHomeLink(link.to)}
                onClick={close}
                className={({ isActive }) => cn(styles.mobileLink, isActive && styles.active)}
              >
                <span>{link.label}</span>
                <span className={styles.mobileLinkArrow} aria-hidden="true">↗</span>
              </NavLink>
            ))}

            <div className={styles.mobileContact}>
              <a href={`tel:${SITE.phone}`} className={styles.mobileContactLink}>
                <Icon name="phone" size={16} />
                <span>{SITE.phone}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className={styles.mobileContactLink}>
                <Icon name="mail" size={16} />
                <span>{SITE.email}</span>
              </a>
            </div>

            <div className={styles.mobileActions}>
              <Button fullWidth to={ROUTES.CONTACT} onClick={close}>
                Get a free quote
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;
