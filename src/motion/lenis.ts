import type Lenis from "lenis";

/** The page's one Lenis instance, set by <SmoothScroll>. Null when motion is reduced. */
export const scroller: { lenis: Lenis | null } = { lenis: null };

/** Freeze page scrolling, e.g. while the full-screen menu is open. */
export function setScrollLocked(locked: boolean) {
    if (locked) scroller.lenis?.stop();
    else scroller.lenis?.start();
}
