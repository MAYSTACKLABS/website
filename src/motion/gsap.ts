import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

// Register every plugin once, here. Components import from this file, never from "gsap" directly.
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin, useGSAP);

gsap.defaults({ ease: "expo.out", duration: 1 });

/** Media queries for gsap.matchMedia(): animate only when the visitor allows motion. */
export const MOTION = "(prefers-reduced-motion: no-preference)";
export const MOTION_DESKTOP = `${MOTION} and (min-width: 801px)`;

export { gsap, ScrollTrigger, SplitText, useGSAP };
