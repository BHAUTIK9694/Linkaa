import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE } from '@constants/site';
import { SITE_URL, DEFAULT_OG_IMAGE, LOCAL_BUSINESS_SCHEMA } from '@constants/seo';

/**
 * Comprehensive SEO head component. Renders all meta tags, Open Graph,
 * Twitter Card, canonical URL, and JSON-LD structured data for a page.
 *
 * @param {object} props
 * @param {string} props.title - Page title (full, not appended)
 * @param {string} props.description - Meta description (150–160 chars ideal)
 * @param {string[]} [props.keywords] - Meta keywords array
 * @param {string} [props.ogImage] - OG image URL (absolute or relative to site)
 * @param {string} [props.ogType] - Open Graph type (default: 'website')
 * @param {string} [props.canonicalPath] - Override canonical path (auto-derived from route)
 * @param {boolean} [props.noindex] - If true, adds noindex,nofollow
 * @param {object|object[]} [props.schema] - JSON-LD structured data (object or array)
 * @param {boolean} [props.includeLocalBusiness] - Include LocalBusiness schema (default: true)
 */
function SEO({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
  canonicalPath,
  noindex = false,
  schema,
  includeLocalBusiness = true,
}) {
  const { pathname } = useLocation();
  const canonical = `${SITE_URL}${canonicalPath || pathname}`;
  const imageUrl = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  // Combine schemas into array
  const schemas = [];
  if (includeLocalBusiness) schemas.push(LOCAL_BUSINESS_SCHEMA);
  if (schema) {
    if (Array.isArray(schema)) schemas.push(...schema);
    else schemas.push(schema);
  }

  return (
    <Helmet>
      {/* Primary meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en-IN" href={canonical} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE.name} — ${SITE.tagline}`} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${SITE.name} — ${SITE.tagline}`} />

      {/* Additional SEO signals */}
      <meta name="author" content={SITE.name} />
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Rajkot" />
      <meta name="geo.position" content="22.2969;70.7718" />
      <meta name="ICBM" content="22.2969, 70.7718" />

      {/* JSON-LD structured data */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}

export default SEO;
