# Rehearsal: mobile (Mobile applications)

Gold: `phone-touch`. Kept: the Expand card-to-screen as one element (clip plus header slide), the press scale on the card, the touch cursor, the States button that changes on itself, the timer/meter lane sharing a grid cell with the about block, the close-and-fold-back loop with an unseen reset (`a.snap`) behind the card's clip.
Changed: product is a calm study planner ("Today" list of sessions, "Design review · 45 min" opens into its session). Dark UI on the near-black page (screen #0e1015, graphite session cards); Maystack blue (#4d8bff) only on the picked session's art and the meter. Button is white Start -> raised Done -> blue-tinted Completed (kit `Icon filled` play/check). Header art shortened to 176pt and the body tightened so the payoff fits the visible crop. Tab bar dropped (it sits off-stage). Stage uses the shared `STAGE`/`COMPACT`/`LOOK`; no plate, the page is the ground.

Framing: wide 680x440, phone 380 wide pinned 40px from the top, centered, running off the bottom (screen at about 0.89 of true size). Compact 358x300 is its own composition: phone 280 wide pinned 14px from the top so the Start/Done button and meter still land clear of the bottom edge and the third card shows as a real crop, not a sliver.

Beats: 1 Today list (0.9s) -> 2 tap "Design review", card opens (1.4s) -> 3 Start, focus timer runs 5s (00:00 to 00:05) with the meter filling -> payoff: Done marks the session complete: the same button turns Completed, the label rolls Focus -> Complete, the timer rolls (kit Count, last digit first, caused by the tap) to the full 45:00 and the meter lands full, held 2.2s -> close folds the card back, reset hidden. Loop about 15.8s. The payoff frame equals the poster.

Poster: open, done, timer 45:00 (matches "45 min"), Completed, meter full. `mobile-poster.png` / `mobile-poster-390.png` in the session scratchpad shots folder.

Captured (after the payoff fix): wide loop (`--gate`, 22 x 700ms), 390 loop (`--gate`), the Done beat at 80ms (`--at done`), the close-to-loop seam at 120ms, reduced-motion poster at both widths. Dark theme only (the site ships dark only).

Gate: `rehearsal passed` at wide and at 390.

Film:

- `half-pixel glyph` on the button icon -> fixed (label in an even 120px box, icon `flex: none`).
- `lands on a transform` on `.ss-expand__content` -> fixed (children of the detail keep a `will-change: transform` layer).
- `loop seam: cursor does not end where it starts` (390) -> fixed (one REST point that sits on the screen in both layouts).
- `settle snap: span.ss-roll__mid ... 58px` -> confirmed as the hidden reset and gone: it was the timer's Roll animating back to 0:00 inside `a.snap` behind the closed card. The timer is now a `Count`, which jumps inside a snap; the warning no longer appears at either width.
- Start -> Done fill passes white to graphite in 200ms; one sampled frame catches a mid-gray. Within the colour-change rule, left as is.

Assumptions: the timer counts up in seconds while running (zero-padded mm:ss so the Count keeps its columns); Done completes the session, so it lands on the session length.

Not checked: the real services page at its real widths (only `/__lab`), live rAF pacing in a headed browser, touch on a device, interruption/offscreen return, a fresh-eye review (`review.md`) by a second reader.
