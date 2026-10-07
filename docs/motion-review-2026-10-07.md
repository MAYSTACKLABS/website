# Motion refinement — 7 October 2026

- Replaced the circular navigation badge with a broad, softly tapered shape based on the supplied reference.
- One 500 ms centre-out reveal now clips the entire navbar, including its glass surface and controls. The badge does not rotate. The final state removes clipping so dropdowns and focus outlines remain usable.
- Removed the hero flight/trail entrance and independent celestial-body entrance. Mountain and foreground clouds now move only 14 px and 4 px over 400 ms.
- Removed footer scroll-driven parallax from the rendered component; the existing hook remains unused for recoverability.
- Preserved theme switching, fixed navigation, responsive controls, and reduced-motion support.

## Verification

Build and lint passed. 29 interaction checks and 25 motion/layout checks passed. Inspected desktop and narrow-screen captures using the design QA checklist.

A single local headless Chromium reload sampled 201 frame intervals: median 7 ms, p95 27.8 ms, with one 64 ms long task. This is a diagnostic sample, not a before/after comparison or evidence of consistent 60 FPS on physical devices. Real-device validation remains appropriate.
