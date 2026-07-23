import { Icon } from '@components/ui';
import { SITE } from '@constants/site';
import { useMediaQuery, useScrollPosition } from '@hooks';
import styles from './MobileCTA.module.css';

const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Livantaa! I would like to enquire about your furniture.')}`;

/**
 * Sticky bottom CTA bar for mobile users — provides persistent access to
 * WhatsApp and phone call actions without scrolling back to header/footer.
 * Only renders on touch/coarse-pointer devices and hides near the footer.
 */
function MobileCTA() {
  const isMobile = useMediaQuery('(max-width: 899px)');
  const isScrolled = useScrollPosition(400);

  if (!isMobile || !isScrolled) return null;

  return (
    <div className={styles.bar} aria-label="Quick contact actions">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.action}
        aria-label="Message us on WhatsApp"
      >
        <Icon name="whatsapp" size={20} />
        <span>WhatsApp</span>
      </a>
      <a
        href={`tel:${SITE.phone}`}
        className={styles.action}
        aria-label="Call us"
      >
        <Icon name="phone" size={20} />
        <span>Call now</span>
      </a>
    </div>
  );
}

export default MobileCTA;
