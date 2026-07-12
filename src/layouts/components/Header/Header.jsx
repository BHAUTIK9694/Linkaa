import { NavLink } from 'react-router-dom';
import { Button, Container, Icon, Logo } from '@components/ui';
import { NAV_LINKS } from '@constants/navigation';
import { ROUTES } from '@constants/routes';
import { SITE } from '@constants/site';
import { useDisclosure, useScrollPosition } from '@hooks';
import { cn } from '@utils/classNames';
import styles from './Header.module.css';

/**
 * Sticky site header with responsive navigation.
 * Collapses into a toggleable panel on small screens.
 */
function Header() {
  const isScrolled = useScrollPosition(8);
  const { isOpen, toggle, close } = useDisclosure(false);

  return (
    <header className={cn(styles.header, isScrolled && styles.scrolled)}>
      <Container>
        <div className={styles.bar}>
          <NavLink to={ROUTES.HOME} className={styles.brand} aria-label={`${SITE.name} home`}>
            <Logo height={28} />
          </NavLink>

          <nav className={styles.desktopNav} aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                className={({ isActive }) => cn(styles.navLink, isActive && styles.active)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <Button variant="ghost" size="sm" to={ROUTES.CONTACT}>
              Sign in
            </Button>
            <Button size="sm" to={ROUTES.PRICING}>
              Get started
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

      <div id="mobile-nav" className={cn(styles.mobileNav, isOpen && styles.mobileOpen)} hidden={!isOpen}>
        <Container>
          <nav className={styles.mobileNavInner} aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                onClick={close}
                className={({ isActive }) => cn(styles.mobileLink, isActive && styles.active)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className={styles.mobileActions}>
              <Button variant="outline" fullWidth to={ROUTES.CONTACT} onClick={close}>
                Sign in
              </Button>
              <Button fullWidth to={ROUTES.PRICING} onClick={close}>
                Get started
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;
