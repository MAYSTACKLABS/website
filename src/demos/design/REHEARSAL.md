# Rehearsal: design (UI/UX design service)

Gold: `examples/figma`. Kept: the three-pane design-tool window (layers, canvas, inspector), the crossfading inspector states, the hover-then-select overlay on the measured button, the fill row, the ⌘Z reset. Changed: dark look from `look.ts` (no plate, the page is the ground); no Figma mark, no Figma name, no purple; neutral active tool so the accent blue belongs only to selection and payoff; the hue-dragging picker became a small popover of library swatches under the Fill row (it opens over the inspector so the button stays visible); the selection ring is a `Follow`; the hex rolls with `Roll`; the second collaborator cursor was dropped for a calmer frame; the hero frame is a dark landing page with one real label ("Get started").

Real strings (6): Hero, Button, Get started, Fill, the hex (E8EAEE / 4D8BFF), Share.

Beats: 1 hover and select the button (ring springs on, layer row and inspector follow) … 2 click the Fill swatch, swatches drop in … 3 pick the brand blue: button fill and inspector swatch ease over 200ms, hex rolls … 4 esc closes the swatches, blue button holds selected ~2.1s (payoff) … 5 ⌘Z (keycaps) puts the fill back, click on empty canvas deselects. Loop ≈ 12.6s.

Poster: `{ selected: true, fill: ACCENT, picker: false }`, the blue button selected with 4D8BFF in the inspector (checked with `--reduced --still`).

Framing: wide is a 600px window inset 40px top and sides, running ~80px off the bottom. Not a true corner bleed: in a design tool the inspector (where the story's words are) is on the right edge, and the toolbar and lights are at the top left, so bleeding off the right would cut the Fill row and bleeding off the left would cut the chrome. Bottom bleed (the gold's own framing) keeps every worded control whole. Compact (358×300) is a redesign: no layers panel, four tools, no facepile, a narrower frame and inspector, layout section dropped so Fill sits high and the swatches (6 columns, 12 colors) fit above the gutter.

Captured: wide loop (22 × 700ms), 390 loop (22 × 700ms), reduced-motion poster, opening still.

Gate:

- wide: `rehearsal passed`
- 390: `rehearsal passed`

Film: candidates seen and left: `steps in its box` on the fill field (wide, first run; a lasting layer was added to the inspector states); three `handoff shift` lines at 390 on the inspector's two crossfading states (the outgoing layer is 6px lower as it fades out, which is the intended rise, not a swap).

Assumptions: the page ground is near-black #05070d; the lab page that film loads is light, so the contact sheets show a light ground and the hero shadow halo, which will not show on the site.

Not checked: the real services page at its widths; frame-by-frame stepping of each beat with `--at`; `--states --gate`; live rAF pacing on a real device; a fresh-eye review (review.md) by another agent.
