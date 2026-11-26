import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION, useGSAP } from "./gsap.ts";

type Effect = "rise" | "unveil" | "focus";

type Props = {
    as?: ElementType;
    className?: string;
    children: ReactNode;
    /** Seconds between each direct child. 0 reveals the block as one piece. */
    stagger?: number;
    /**
     * rise: a short lift and fade, for text.
     * unveil: a mask opens upward, for images and screens.
     * focus: comes into focus from a soft blur, for groups of cards.
     */
    effect?: Effect;
};

const FROM: Record<Effect, gsap.TweenVars> = {
    rise: { autoAlpha: 0, y: 24, duration: 1 },
    unveil: { clipPath: "inset(100% 0% 0% 0%)", y: 40, duration: 1.4, ease: "power3.out" },
    focus: { autoAlpha: 0, filter: "blur(10px)", scale: 0.98, duration: 1.1, ease: "power2.out" },
};

/** Reveals its children the first time they scroll into view. Static for reduced motion. */
export function Reveal({
    as: Tag = "div",
    className,
    children,
    stagger = 0.08,
    effect = "rise",
}: Props) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                const targets = stagger ? ref.current!.children : ref.current;
                gsap.from(targets, {
                    ...FROM[effect],
                    stagger,
                    clearProps: "filter,clipPath",
                    scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
                });
            });
        },
        { scope: ref },
    );

    return (
        <Tag ref={ref} className={className}>
            {children}
        </Tag>
    );
}
