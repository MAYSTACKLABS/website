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

## Next

- Stageshow product demos for the services (faux UI: a design tool, a phone app, a website, a dashboard), replacing the static screenshots in the services scene.
- Client logos and approved testimonials, when supplied.
