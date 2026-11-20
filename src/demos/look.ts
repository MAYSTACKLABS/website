// One figure language for every service demo (Stageshow craft: "A page of demos").
// Each demo passes these to its <Stage> so size, theme and accent never drift apart.

/** Wide design: the column beside the copy in the pinned services scene. */
export const STAGE = { width: 680, height: 440 } as const;

/** Phone design: a second composition, not a squeeze (framing.md, Small formats). */
export const COMPACT = { below: 560, width: 358, height: 300 } as const;

/** The site is dark-first; demos are always dark, in Maystack blue. */
export const LOOK = { theme: "dark", accent: "#4d8bff" } as const;
