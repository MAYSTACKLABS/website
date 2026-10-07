# Maystack website

React, TypeScript, and Vite. English and Arabic, with light and dark themes.

## Development

- `npm install`
- `npm run dev` — local preview.
- `npm run build` — type check and production build.
- `npm run lint` — source checks.

## Source structure

- `src/app/` — routes, application entry, providers.
- `src/components/` — shared navigation, footer, and layout.
- `src/components/shared/` — reusable device mockups, illustrated landscape, process, and CTA.
- `src/pages/` — route components and homepage sections.
- `src/data/` — project records, case studies, and service content.
- `src/config/site.ts` — email, WhatsApp, and company details.
- `src/context/` — persistent language and theme settings.
- `src/styles/` — design tokens plus one stylesheet per feature; imported once by `src/index.css`.
- `src/assets/` — brand, original illustrated landscape, and actual project images.
- `docs/design-direction.md` — user-approved reference hierarchy and visual constraints.
- `screenshots/` — ignored local QA captures and reports; never part of the public build.

## Editing content

Change project information in `src/data/projectsData.ts` and story/live-site information in `src/data/projectCaseStudies.ts`. Change service descriptions in `src/data/services.ts`. Do not scatter contact addresses through page components.

The contact form posts to FormSubmit using the address in `src/config/site.ts`. The owner must activate/verify that destination inbox with the service. Local QA mocks delivery; it does not verify receipt.

## Visual constraints

Follow the supplied Figma design, not a new visual identity. Blue day sky, navy night sky, white condensed hero typography, original illustrated mountains/clouds, and static device previews. Preserve the approved portfolio grid. No green rebranding, recurring mountain stamps, or independent section background panels.

Approved customer quotes are required before adding testimonials. No placeholder customer claims should be published.
