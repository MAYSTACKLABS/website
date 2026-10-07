# Maystack design direction

## Source of truth

The user's Figma hero references supplied on 4 October 2026 are authoritative:

- Bright royal-blue daytime sky; deep navy nighttime sky.
- White condensed “FROM IDEA / TO ALTITUDE” headline on the left.
- Maystack bird and a restrained flight trail on the right.
- Original illustrated blue mountain with the sun or moon behind its main peak.
- Playful clouds form a crisp scalloped divider; no blurred fade or rectangular edge.
- Always-white lock navbar: rotating circular center logo, extending left/right wings, four visible desktop links, language/theme endcaps. Motion is disabled for reduced-motion users.

The supplied contact and “Ready to take off?” screenshots guide those compositions.
The final multi-page AI reference is secondary inspiration, especially for the process timeline. It does not authorize a new brand identity or invented claims.

## Keep and avoid

- Keep the portfolio grid layout the user approved, real project screens, laptop presentation, and angled mobile preview.
- Keep the email centralized as `contact@maystack.net`.
- Use blue, navy, white, and ice-blue. Do not introduce green/teal branding.
- Do not replace the illustrated assets with photographic or realistic mountains.
- Landscape artwork belongs in the homepage hero, contact composition, and one shared scenic footer on every page. No repeated scenery inside content sections.
- No bobbing devices, orbit graphics, automatic project cycling, fabricated testimonials, or fabricated project outcomes.
- Process heading: “One team. The full stack.” No second redundant heading.

## Structure

`components/shared/` owns the device presentation, illustrated landscape, process, and closing CTA. Page-specific sections stay inside `pages/`. Theme values are centralized in `styles/tokens.css`; the sky transition belongs to the shared app shell. Sections do not each introduce a new canvas color.

## Validation and remaining content

Local screenshots and browser reports are under the ignored `screenshots/lock-final/` directory. The contact success/error tests mock network delivery and do not prove that FormSubmit is activated for the new inbox.

The owner approved Core Istanbul, Growthline, Snowball Foundation, and Hope Team as public client names on 5 October. Original logos and real approved testimonial text are still pending. The reusable testimonial section stays hidden until populated; do not substitute fictional customer quotes.

The process is one connected scroll-driven signal rather than separate cards. Reduced motion displays a static completed path. Smaller headings use the UI font; condensed typography is reserved for major statements. The cloud divider is an edited cutout of the original playful illustration, with an opaque scalloped lower edge and no CSS fade mask. See `cloud-asset.md`. A realistic-cloud experiment was rejected by the owner and is not used.

Original illustrated assets are reused from `assets/hero/optimized/`; the rejected realistic ridge is not used. Pinterest references were researched, but no unverified third-party image was inserted into the site.
