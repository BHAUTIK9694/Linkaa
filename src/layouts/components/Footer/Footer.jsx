import { Link } from 'react-router-dom';
import { Container, Icon, Logo } from '@components/ui';
import { Newsletter } from '@components/common';
import { FOOTER_NAV } from '@constants/navigation';
import { ROUTES } from '@constants/routes';
import { SITE, SOCIAL_LINKS } from '@constants/site';
import styles from './Footer.module.css';

/**
 * Global site footer — restructured with newsletter in place of map.
 * Sections: brand + quick links, contact info, working hours,
 * WhatsApp CTA, newsletter signup, social links, and legal bar.
 */
function Footer() {
  const whatsappLink = `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Livantaa! I would like to enquire about your furniture.')}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Container>
          <div className={styles.top}>
            {/* Left side: brand, nav, contact, hours */}
            <div className={styles.infoSide}>
              {/* Brand + nav */}
              <div className={styles.brandNav}>
                <div className={styles.brandCol}>
                  <Link to={ROUTES.HOME} aria-label={`${SITE.name} home`} className={styles.brand}>
                    <Logo height={30} />
                  </Link>
                  <p className={styles.blurb}>{SITE.tagline}</p>
                </div>

                {/* Quick links */}
                <nav aria-label="Footer navigation" className={styles.nav}>
                  {FOOTER_NAV.map((group) => (
                    <div key={group.id} className={styles.navGroup}>
                      <h3 className={styles.navTitle}>{group.title}</h3>
                      <ul className={styles.navList}>
                        {group.links.map((link) => (
                          <li key={link.id}>
                            <Link to={link.to} className={styles.navLinkItem}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Contact + Hours row */}
              <div className={styles.contactHours}>
                {/* Contact info */}
                <div className={styles.contactBlock} itemScope itemType="https://schema.org/LocalBusiness">
                  <meta itemProp="name" content="Livantaa" />
                  <h3 className={styles.sectionTitle}>Contact</h3>
                  <ul className={styles.contactList}>
                    <li className={styles.contactItem}>
                      <Icon name="map-pin" size={16} />
                      <a
                        href={SITE.googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.contactLink}
                        itemProp="address"
                        itemScope
                        itemType="https://schema.org/PostalAddress"
                      >
                        <span itemProp="streetAddress">{SITE.showroom.lines[0]}</span>,{' '}
                        <span itemProp="addressLocality">Rajkot</span>{' '}
                        <span itemProp="postalCode">360005</span>,{' '}
                        <span itemProp="addressRegion">Gujarat</span>,{' '}
                        <span itemProp="addressCountry">India</span>
                      </a>
                    </li>
                    <li className={styles.contactItem}>
                      <Icon name="phone" size={16} />
                      <a href={`tel:${SITE.phone}`} className={styles.contactLink} itemProp="telephone">
                        {SITE.phone}
                      </a>
                    </li>
                    <li className={styles.contactItem}>
                      <Icon name="mail" size={16} />
                      <a href={`mailto:${SITE.email}`} className={styles.contactLink} itemProp="email">
                        {SITE.email}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Working hours */}
                <div className={styles.hoursBlock}>
                  <h3 className={styles.sectionTitle}>Working Hours</h3>
                  <ul className={styles.hoursList}>
                    <li className={styles.hoursItem}>
                      <span className={styles.hoursDay}>Mon – Sat</span>
                      <span className={styles.hoursTime}>10:00 AM – 7:00 PM</span>
                    </li>
                    <li className={styles.hoursItem}>
                      <span className={styles.hoursDay}>Sunday</span>
                      <span className={styles.hoursTime}>By appointment only</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappCta}
                aria-label="Message us on WhatsApp"
              >
                <Icon name="whatsapp" size={20} />
                <span>Message us on WhatsApp</span>
              </a>

              {/* Social links */}
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
                      <Icon name={social.id} size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side: Newsletter */}
            <div className={styles.newsletterSide}>
              <Newsletter />
            </div>
          </div>

          {/* Legal bar */}
          <div className={styles.bottom}>
            <p className={styles.copy}>
              © {SITE.year} {SITE.name}. All rights reserved.
            </p>
            <a
              href="https://synovixa.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.poweredBy}
            >
              <span className={styles.poweredLabel}>Designed & Developed by</span>
              <span className={styles.synovixaName}>Synovixa</span>
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
