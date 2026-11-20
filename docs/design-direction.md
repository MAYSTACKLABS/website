# Design direction: The Ascent

Premium and minimal. One focus on screen at a time. Motion explains, it never decorates.

## Rules

- **Ground and colour.** Near-black (`--bg`) by default, a light theme kept. One accent, Maystack blue (`--accent`). No gradients behind content; the hero's faint summit glow is the only one.
- **Type.** Bebas Neue for large statements only (`.display`, hero). Manrope for everything else. Cairo for Arabic, which never uses the condensed face.
- **One focus.** Each home scene pins and shows one thing: one service, one project, one step. Don't stack decorative layers (the old sky, clouds, sun and mountain were removed for this reason).
- **The line.** A thin line is the brand motif: the hero's ridge and flight path, the altitude line on the page edge, the process progress line.
- **Real work only.** Real screenshots, real client names (approved 5 October 2026). No invented metrics, quotes or logos.

## Motion

- Every animation lives inside `gsap.matchMedia()` with `MOTION` or `MOTION_DESKTOP` (`src/motion/gsap.ts`). Without motion, or on phones, scenes fall back to a plain readable layout.
- Pinned scenes on desktop only. Phones get stacked content.
- Arabic text is split by word, never by letter, so its joined letterforms stay intact.
- Lenis provides smooth scrolling and drives GSAP's ticker; don't add CSS `scroll-behavior: smooth`.

## Service demos (Stageshow)

Each service is shown by an animated faux-product demo in `src/demos/<id>/`, built with the vendored Stageshow kit (`src/vendor/stageshow/kit`, MIT). All four share `src/demos/look.ts`: 680 × 440 wide, a separate 358 × 300 phone design, dark, Maystack blue. Each folder's `REHEARSAL.md` records the gold example it was copied from and what was and wasn't checked.

- Preview one alone in development at `/__lab?demo=design` (or `mobile`, `web`, `platforms`).
- Film it with the Stageshow skill: `node scripts/film.mjs "http://localhost:5173/__lab?demo=web" --out shot.png --every 700 --count 22 --gate` from the skill folder. Ship only on `rehearsal passed`.

## Next

- Client logos and approved testimonials, when supplied.
