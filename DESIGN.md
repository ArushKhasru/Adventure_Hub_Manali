# Design

## Direction

Adventure Hub Manali uses the approved Direction A: a full-bleed Himalayan panorama owns the hero, trail-sign links provide immediate wayfinding, and the three non-active images form a vertical strip at the right edge. The result is cinematic, practical, and recognizably outdoors without becoming a corporate travel brochure.

Scene: a family group or group of adventure travelers plans a lively but affordable Manali trip in bright daylight, often on a phone; the interface must feel clear outdoors, cheerful, and easy to act on.

## Color

Use OKLCH values in code. Hex values document the approved source palette.

| Role | OKLCH | Source | Use |
| --- | --- | --- | --- |
| Primary forest | `oklch(47.58% 0.0777 162.16)` | `#2D6A4F` | Header, footer, primary actions |
| Deep forest | `oklch(38.15% 0.0613 164.19)` | `#1E4D3A` | Hover, pressed, image overlays |
| Supporting mint | `oklch(82.01% 0.0819 159.98)` | `#95D5B2` | Tints, icon discs, secondary details |
| Pure white | `oklch(100% 0 0)` | `#FFFFFF` | Main canvas and text on green |
| Soft white | `oklch(98.16% 0.0017 247.84)` | `#F8F9FA` | Alternating neutral sections |
| Dark ink | `oklch(22.84% 0.0384 282.93)` | `#1A1A2E` | Body text and text on gold |
| Muted slate | `oklch(51.28% 0.0375 264.16)` | `#5C677D` | Secondary text on white only |
| Warm gold | `oklch(75.41% 0.0853 67.10)` | `#D4A574` | Trail signs, CTA, focus accent |

Contrast contracts:

- Forest on white: 6.39:1.
- Deep forest on white: 9.64:1.
- Dark ink on white: 17.06:1.
- Muted slate on white: 5.69:1.
- Dark ink on gold: 7.66:1.
- Gold on white is not an accessible text pairing and is prohibited.

## Typography

- Display: Bricolage Grotesque, variable weight 600–800, for the friendly trail-sign character.
- Body and UI: Atkinson Hyperlegible Next, variable weight 400–700, for navigation and travel information.
- Hero display: fluid `clamp()` with a maximum below 5.5rem and letter spacing no tighter than `-0.035em`.
- Body copy: at least 1rem, 1.6 line height, and a maximum measure of 68ch.
- Headings use balanced wrapping; prose uses pretty wrapping.

## Layout

- Tailwind CSS utilities are the component styling system; do not add CSS modules or separate component stylesheets.
- Mobile-first, with content-driven breakpoints near 42rem and 64rem.
- Maximum content width: 76rem with fluid side gutters.
- Spacing follows a 4px-derived scale: 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, and 6rem.
- The hero is a full-bleed active image with left-led copy, a three-link wooden trail sign, three non-active image thumbnails, arrows, pause control, and position indicators.
- A jagged white edge separates the cinematic hero from the agency résumé.
- Service discovery uses an asymmetric image composition rather than repeated identical cards.
- The header is fixed to the viewport. The footer is shared by every route and remains in normal document flow.

## Components

- Brand mark: semantic text plus an original code-native mountain, route, and pin SVG.
- Header: active route state, desktop navigation, accessible mobile disclosure, and an “Explore tours” CTA.
- Carousel: four Manali images, horizontal slide travel, visible previous/next and pause controls, position indicators, keyboard support, polite status, touch-friendly targets, pause on hover/focus, and no autoplay under reduced motion.
- Trail sign: three route-mapped links for stays, travel, and activities.
- Agency résumé: concise agency purpose followed by three inline service benefits.
- Tour discovery: four photo-led paths mapped to activities, hotel, and travel routes.
- Contact band: the contact-page action is live; missing phone and WhatsApp details appear as honest status text, never fake or dead links.
- Footer: brand summary, existing-route navigation, and contact availability note only.

## Imagery

Use four cohesive, project-local images with natural/cinematic daylight grading:

1. A sweeping Himalayan valley and river panorama.
2. A candid Indian family enjoying a safe mountain outing.
3. A rafting group wearing visible safety equipment.
4. A welcoming wooden mountain lodge against the Himalayas.

The active frame must tolerate full-bleed desktop and narrow mobile crops. Do not use romantic-couple imagery, luxury-resort clichés, unsafe activity shots, text, logos, watermarks, or imagery presented as customer proof.

## Motion

- Signature motion: the full-bleed image track travels horizontally with an ease-out-expo curve.
- UI feedback: 120–250ms. Menu and state changes: 220–300ms. Carousel movement: approximately 650ms.
- Motion uses transforms and opacity; it does not casually animate layout properties.
- `prefers-reduced-motion: reduce` disables autoplay and removes non-essential transitions.

## Accessibility

- Target WCAG 2.2 AA.
- Interactive controls have at least 44×44px targets and visible focus indicators.
- Navigation includes a skip link, semantic landmarks, active-page indication, route-close behavior, and Escape handling for the mobile menu.
- Carousel information and controls remain usable with keyboard, screen reader, touch, pointer, zoom, and reduced motion.
- Alternative text and slide labels describe useful scenes without presenting generated people as real customers.
