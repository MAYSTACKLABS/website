import { useRef, type ReactNode } from "react";
import { useLocale } from "../i18n/useLocale.ts";
import { gsap, MOTION, SplitText, useGSAP } from "./gsap.ts";

type Props = {
    as?: "h1" | "h2" | "h3" | "p";
    className?: string;
    children: ReactNode;
    /** "load" plays once on mount; "view" plays when scrolled into view. */
    trigger?: "load" | "view";
    delay?: number;
};

/**
 * Big statements rise out of a mask, letter by letter.
 * Arabic splits by word: splitting into letters would break its joined letterforms.
 */
export function SplitHeading({
    as: Tag = "h2",
    className,
    children,
    trigger = "view",
    delay = 0,
}: Props) {
    const ref = useRef<HTMLHeadingElement>(null);
    const { lang } = useLocale();

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                const byWord = lang === "ar";
                const split = SplitText.create(ref.current, {
                    type: byWord ? "lines,words" : "lines,chars",
                    mask: "lines",
                    autoSplit: true,
                    onSplit: (self) =>
                        gsap.from(byWord ? self.words : self.chars, {
                            yPercent: 110,
                            duration: 1.2,
                            delay,
                            stagger: byWord ? 0.06 : 0.018,
                            scrollTrigger:
                                trigger === "view"
                                    ? { trigger: ref.current, start: "top 85%", once: true }
                                    : undefined,
                        }),
                });
                return () => split.revert();
            });
        },
        { scope: ref, dependencies: [lang], revertOnUpdate: true },
    );

    return (
        // Keyed by language: SplitText rewrites the DOM, so a new language needs a fresh element.
        <Tag key={lang} ref={ref} className={className}>
            {children}
        </Tag>
    );
}
