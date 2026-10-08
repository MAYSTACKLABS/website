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
- `src/components/shared/PhoneField.tsx` and `src/utils/phone.ts` — country selection and shared phone parsing; styles live in `src/styles/phone-field.css`.
- `src/hooks/useBrowserTheme.ts` — browser theme and overscroll background, including the pale footer edge.
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

### Contact delivery

- FormSubmit documents email confirmation on first use. A code-only redeploy does not itself change the destination address or activate an inbox. Check confirmation for the production form when changing its URL or recipient.
- The current AJAX integration disables CAPTCHA. FormSubmit warns that disabling CAPTCHA can lead to service limitations; a successful build is not proof of email delivery. See https://formsubmit.co/.
- If delivery is intermittent, inspect the failed request in the browser network panel, confirm the production form's activation email in `contact@maystack.net`, and check spam. Do not assume that every failure needs reactivation.
- The interface checks both HTTP status and the provider's success flag, times out after 20 seconds, prevents concurrent submissions, and keeps answers available on errors. The error provides email and WhatsApp links. A timeout means delivery is unconfirmed, so requests are never automatically retried.
- All single-choice questions advance immediately. Back retains answers; changing the enquiry branch clears only branch-specific answers. The final step requires an explicit Send enquiry action.

## Analytics status

As checked on 8 October 2026, this repository has SEO metadata and structured data, but no Google Analytics, Tag Manager, or other analytics integration. No tracking ID was found in Git history or the reviewed earlier project chats. The public homepage and entry bundle also contained no analytics tag. Search Console verification through a hosting account or DNS is separate and has not been confirmed. Supply the intended measurement/container ID before adding a tracker.

## Visual constraints

Follow the supplied Figma design, not a new visual identity. Blue day sky, navy night sky, white condensed hero typography, original illustrated mountains/clouds, and static device previews. Preserve the approved portfolio grid. No green rebranding, recurring mountain stamps, or independent section background panels.

Approved customer quotes are required before adding testimonials. No placeholder customer claims should be published.
