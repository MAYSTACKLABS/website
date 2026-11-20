import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION, useGSAP } from "./gsap.ts";

type Props = {
    as?: ElementType;
    className?: string;
    children: ReactNode;
    /** Seconds between each direct child. 0 reveals the block as one piece. */
    stagger?: number;
};

/** Fades its children up the first time they scroll into view. Static for reduced motion. */
export function Reveal({ as: Tag = "div", className, children, stagger = 0.08 }: Props) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                const targets = stagger ? ref.current!.children : ref.current;
                gsap.from(targets, {
                    autoAlpha: 0,
                    y: 32,
                    stagger,
                    duration: 1.1,
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
