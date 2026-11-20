# Rehearsal: web (Web development)

Gold: `loading` (kept: a skeleton at the content's own geometry, bar and content sharing one grid cell, resolve top to bottom with a per-row delay, faint slow shimmer, real chrome throughout). Terminal satellite from `ruled-bento` (`Window chrome="terminal"`, `Prompt`, `ok`/`dim` output, tick in a character cell) placed the `hero-demo` way: a reserved left column so it straddles the browser's edge.
Changed: dark theme on the page's own ground (no plate); orders list replaced by a marketing hero (wordmark, a two-line headline, sub bars, one primary button, a product shot with a `Chart` below the fold); corner bleed (browser one 32px gutter from top, off right and bottom); the refresh reset replaced by a new `git push`.

Beats: skeleton + `git push` (0–1s) → Building spinner → tick "Built in 14s" + Deploying (2.7s) → tick "Deployed", address rolls `preview.northwind.app` → `northwind.app`, spinner → lock, page resolves top to bottom (4.4s) → payoff holds 2.8s with a waiting prompt → `git push` typed on the new prompt, Enter: page drops back to skeleton (reverse stagger), address rolls back, terminal output scrolls out under a soft top edge → unseen snap to the opening frame. Loop ~11s wide, ~8.5s compact.
Poster: the live page, lock and `northwind.app`, terminal showing both ticks and a waiting prompt.
Compact (358×300): the terminal is dropped; the browser bleeds right and bottom from a 16px gutter, the hero is left-aligned, the product card is sized so its edge sits one gutter inside the stage. The address spinner/lock and roll carry the deploy; build waits are shortened since nothing shows them.

Real strings: address, wordmark, headline, button, `git push`, Built / Deployed (+ "in 14s").

Captured: wide 680 and 390 loops (22 frames every 700ms, `--gate`), reduced-motion poster at both widths, the reset seam (`--at next`).
Gate: wide `rehearsal passed`; 390 `rehearsal passed`.
Film (candidates that stand):

- `settle snap` (web-track, prompt spans shift 80px) and `vanishes with no exit` (the second prompt): the invisible loop reset. After the scroll, the new prompt sits exactly where the first one was with identical content, then state snaps back; no pixel changes. Intentional.
- `jump: ss-chart__dot` / `same-box content change: ss-chart`: the kit Chart's own draw-in when the page resolves.
- `Layout checks remain deferred: web-sk-lines` at 390: the shimmer moving at the last shot, not geometry.

Assumptions: Northwind / northwind.app are fictional; the lab ground is the site's near-black.
Unresolved: none blocking. The compact design does not show the terminal at all (brief allowed dropping it).
Not checked: the real Services page host at its widths (only `/__lab`); live rAF pacing on a real device; offscreen/hidden-tab resume; touch; the fresh-eye review in review.md was not run.
