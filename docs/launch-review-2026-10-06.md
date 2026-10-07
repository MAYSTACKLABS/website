# Maystack launch review — 6 October 2026

## Customer perspective

- Services, project case studies, and the project enquiry path are available in English and Arabic.
- Fresh Snowball dashboard/calendar captures now replace the old profile and menu screenshots. Captures exclude personal account details; aggregate platform counts are part of the actual UI, not claimed Maystack outcomes.
- Testimonial cards are explicitly labelled placeholders. Owner: supply approved quotes and logos, or hide the previews before a public launch.
- Growthline and Hope Team do not yet have live URLs configured. Owner: supply confirmed destinations if live-site links are wanted.

## UI/UX perspective

- Kept the blue/navy identity and the hero display font; other titles use the shared UI font.
- Removed rear clouds, shortened scene entrances, and moved the flying wings behind the mountain layer with a shared flight/trail path.
- Mobile project action is an accessible arrow-only button. Contact shortcuts hide while the mobile menu is open.
- Home projects support pointer drag, touch swipe, keyboard arrows, and the existing numbered controls.
- Testimonials scroll horizontally on mobile. Case-study desktop screenshots scroll horizontally on larger screens; mobile layouts use full-width screenshots and vertically stacked, readable phones.
- Portfolio remains a two-column grid with a centred odd last card. Removed the coloured capsules behind devices at the owner's latest request.
- Services uses the restored real-project UI/UX preview; the rejected wireframe/interface concept is archived outside application source. Mobile phones have subtle static perspective and shadows without a coloured glow. Custom Platforms shows the actual dashboard overview rather than the calendar. The redundant four-link index and separator remain removed.
- Navigation now matches the reference more closely: a fixed translucent pill, language on the left, theme on the right, two navigation items per side, and the central logo. Reserved scrollbar space prevents horizontal movement between routes. Narrow-screen project navigation remains an accessible arrow button.
- Raised the hero mountain and lowered the desktop flight endpoint to reduce the empty space between them.
- Enlarged and lifted both celestial bodies; corrected star stacking so the night sky no longer covers them. Reduced-motion support remains intact.
- The Maystack case study now uses fresh captures of the current Home, Services, and Contact pages, with corresponding mobile captures.
- Enquiries include an optional phone number, alongside required name/email and optional project details.

## Implementation perspective

- Shared scene, flight, phone frame, project data, and reusable swipe hook avoid repeating behaviour across pages.
- Build and lint passed. Isolated Chromium checks covered route changes, themes, Arabic, mobile navigation, keyboard focus, drag navigation, reduced motion, and mocked form success/failure.
- Desktop/mobile screenshots were inspected. No claim of Safari or physical-device performance verification.
- Contact form uses FormSubmit. Its UI was tested with mocked responses; actual inbox delivery and recipient activation remain unverified. Owner: test delivery to contact@maystack.net before launch.
- Changes remain local. Publishing and a production smoke test are still separate steps.

## Launch judgement

The structure is sufficient for a first agency launch: offer, process, work, detail pages, and enquiry path. Avoid another broad visual redesign before launch. Prioritise approved client proof, concrete and verifiable project outcomes, inbox delivery, and a short explanation of how enquiry data is handled (the form is sent through FormSubmit). Confirm live-project links where available. A physical-phone check is still needed; simulated mobile checks do not establish real-device performance.
