# Maystack website

React 19, TypeScript and Vite. English and Arabic, dark and light themes. Motion by GSAP and Lenis.

```sh
npm install
npm run dev      # local preview
npm run build    # type check and production build
npm run lint     # ESLint
npm run format   # Prettier
```

## Where things live

| Folder | What it holds |
|---|---|
| `src/app/` | App shell and routes |
| `src/pages/<page>/` | One folder per page: the page, its sections, its CSS |
| `src/components/layout/` | Header, footer, altitude line |
| `src/components/ui/` | Small reusable parts: `ButtonLink`, `PageIntro`, `ProductScreen`, `Screenshot` |
| `src/components/` | Site-specific parts shared by pages: `ProjectCard`, `ServiceVisual` |
| `src/content/` | All content: one file per project, services, process, enquiry questions, contact details |
| `src/i18n/` | `useLocale()` hook and the `en.json` / `ar.json` interface text |
| `src/motion/` | GSAP setup, smooth scrolling, `Reveal`, `SplitHeading` |
| `src/styles/global.css` | Design tokens, reset and the few global primitives |

Each component imports its own CSS from the file next to it.

## Editing content

- **A project:** edit or add a file in `src/content/projects/`, then list it in `index.ts`. Desktop screenshots need two WebP files: `name.webp` (1600px) and `name-800.webp`.
- **Interface text:** `src/i18n/en.json` and `ar.json`. Keep the two files' keys identical.
- **Content text** (projects, services, process, enquiry): written in both languages inline as `{ en, ar }`, read with `pick()`.
- **Email and WhatsApp:** `src/content/site.ts` only.

## Contact form

Enquiries post to FormSubmit (`src/pages/contact/submitEnquiry.ts`) at the address in `site.ts`. FormSubmit asks the inbox to confirm on first use; a build alone doesn't prove delivery. CAPTCHA is off, which FormSubmit warns can limit the service. Failures keep the visitor's answers and point to email and WhatsApp.

## Design

See `docs/design-direction.md`.
