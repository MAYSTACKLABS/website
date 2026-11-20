# Rehearsal: platforms

## Gold copied

`examples/dark-hero`: the stage structure, sidebar window with the address in the content bar,
corner-bleed crop (inset 48 top and left, 32px off the right, off the bottom), 62px grid rows,
`Collapse reveal="drop"` for the new row, and the status changing on its own pill.
Count-after-cause timing from `examples/table-edit`; the new row plus a rolling count from `examples/subscriptions`.

## What changed

- Product: an internal approvals tool (`ops.kestrel.co/approvals`, fictional). Rows are requests:
  avatar (kit person colors), name, kind, status pill, Approve button.
- Story (about 10.5s loop): a request drops in at the top and carries the list down; "Awaiting review"
  rolls 12 -> 13; the cursor clicks Approve, a spinner grows into the same button's icon slot; the pill
  rolls Pending -> Approved (the accent, the one lit color) and the button fades; the count rolls
  back to 12 a beat later. Payoff holds about 2.5s, then the approved request leaves the queue
  (caused exit, Collapse closes), and its state resets unseen while closed.
- The count is "Awaiting review", so it rises on arrival and falls on approval: every change has a
  cause and nothing rewinds in view.
- Not copied: the gold's `uneven inset` nav (items now hug their content) and its `lopsided` badge
  (kit `Badge dot` with `Roll` for the word). The Approve button sets `--ss-button-pad-icon: 8px` so the
  spinner side pads like the label side.
- Stage is transparent (page is the ground). Compact (358x300) is its own design: no sidebar,
  window 16px in from top and left, 32px off the right, narrower status and action tracks.
- Real strings: Approvals, Awaiting review + count, Ivy Moreno / Trade account, Pending/Approved,
  Approve, Halden Co / Net-30 terms. The rest is placeholder.
- Poster: the new request approved, count back at 12, Halden Co still pending below.

## Film

- Wide, `--gate`: rehearsal passed. Remaining candidate: `appears with no entrance` on the Count's
  digit strip; the 8x zoom of the arrive beat shows the digits rolling 12 -> 13 -> 12 cleanly, so
  this looks like a detector reading of the strip, not a visible pop.
- 390, `--gate`: rehearsal passed, same single candidate.
- Reduced-motion poster at both widths: no issues detected.
- `npx tsc -b` and `npx eslint src` pass.

## Not checked

- The real host page (pinned services scene) at its widths; only the `__lab` route was filmed.
- Live frame pacing in a real browser, hover/offscreen pause and resume, touch devices.
- The fresh-eye review (`references/review.md`) was not run by a separate reviewer.
