# Livantaa — Improvement Tracker

**Last updated:** July 2026

---

## All Implemented ✅

### New Sections Added to Home Page
1. ✅ **Certifications band** — Trust signals strip (FSC Certified, Handmade in India, Lifetime Guarantee, Zero VOC, Locally Sourced)
2. ✅ **Comparison section** — Factory vs Livantaa side-by-side table (material, joinery, finish, guarantee, sizing, timeline)
3. ✅ **PricingGuide section** — Transparent price ranges per category with "Get exact quote" CTAs
4. ✅ **ProcessGallery section** — Interactive 6-step craft process with progress indicator on dark background
5. ✅ **Sustainability section** — 4 environmental impact metrics (FSC, Zero waste, Local sourcing, Zero VOCs)
6. ✅ **ClientJourney section** — Detailed featured client story with need/process/result timeline + quote
7. ✅ **FeaturedProjects section** — (previously built) Masonry grid with hover overlays

### New Sections Added to Other Pages
8. ✅ **Workshop section** (About page) — Workshop stats band (3,000 sq ft, 12 craftsmen, 3 finishing rooms)
9. ✅ **Sustainability section** (About + Features pages) — Reused across relevant pages

### Design & Animation Improvements
10. ✅ **ScrollProgress bar** — Thin progress indicator at top of viewport filling as user scrolls
11. ✅ **Card hover tilt** — CSS `.tilt-card` utility with 3D perspective rotation on hover
12. ✅ **Section divider accents** — CSS `.section-divider` utility for subtle line between sections
13. ✅ **Image blur-up loading** — CSS `.img-blur` utility for blur-to-sharp loading effect
14. ✅ **Reveal animation distance** — Reduced to 20px for subtler motion (previously done)
15. ✅ **Splash screen optimized** — 800ms duration, skipped for return visitors (previously done)

### Content & Conversion
16. ✅ **Pricing transparency** — Full pricing ranges visible on home page
17. ✅ **Urgency signal** — PricingGuide includes EMI availability note
18. ✅ **Trust signals everywhere** — Certifications band, CTA trust badge, LogoCloud label
19. ✅ **Comparison objection handling** — Directly addresses "why pay more?" question

### Icons Added
20. ✅ **New icon set** — x, recycle, table, bed, cabinet, armchair icons added to registry

---

## Home Page Section Order (Final)

1. Hero
2. LogoCloud
3. Certifications
4. Collections
5. Comparison
6. Features
7. PricingGuide
8. HowItWorks
9. ProcessGallery
10. StatsBand
11. Showcase
12. FeaturedProjects
13. Sustainability
14. ClientJourney
15. Testimonials
16. FAQ
17. CTA

---

## Remaining Future Work

| # | Item | Priority | Notes |
|---|------|----------|-------|
| 1 | Individual collection pages | High | `/collections/:slug` with galleries |
| 2 | Project case study pages | High | `/projects/:slug` with full photo sets |
| 3 | Blog / Journal | High | SEO content marketing |
| 4 | Instagram social feed section | Medium | Curated workshop photos grid |
| 5 | Hero ambient video | Medium | 10-15s muted workshop loop |
| 6 | Real workshop/team photography | Medium | Replace placeholder patterns with actual photos |
| 7 | Video testimonials | Medium | 1-2 short client clips |
| 8 | Page transitions (Framer Motion) | Low | Fade crossfade between routes |
| 9 | Scroll-driven horizontal gallery | Low | Pin-and-scroll for projects |
| 10 | Multi-language support | Low | Hindi/Gujarati |
| 11 | Image optimization pipeline | Medium | WebP/AVIF via vite-imagetools |
| 12 | Exit-intent lead capture modal | Low | Email capture on first visit |

---

*All sections are production-ready and pass build + lint. Photography placeholders (Workshop section) should be replaced with actual workshop images when available.*
