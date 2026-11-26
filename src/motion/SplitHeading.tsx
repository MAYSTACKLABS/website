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
    /** rise: letters lift out of a mask. blur: words come into focus one by one (React Bits' BlurText idea). */
    effect?: "rise" | "blur";
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
    effect = "rise",
}: Props) {
    const ref = useRef<HTMLHeadingElement>(null);
    const { lang } = useLocale();

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                const blur = effect === "blur";
                const byWord = blur || lang === "ar";
                const scrollTrigger =
                    trigger === "view"
                        ? { trigger: ref.current, start: "top 85%", once: true }
                        : undefined;
                const split = SplitText.create(ref.current, {
                    type: byWord ? "lines,words" : "lines,chars",
                    mask: blur ? undefined : "lines",
                    autoSplit: true,
                    onSplit: (self) =>
                        blur
                            ? gsap.from(self.words, {
                                  autoAlpha: 0,
                                  filter: "blur(12px)",
                                  y: 12,
                                  duration: 1,
                                  ease: "power2.out",
                                  delay,
                                  stagger: 0.07,
                                  clearProps: "filter",
                                  scrollTrigger,
                              })
                            : gsap.from(byWord ? self.words : self.chars, {
                                  yPercent: 110,
                                  duration: 1.2,
                                  delay,
                                  stagger: byWord ? 0.06 : 0.018,
                                  scrollTrigger,
                              }),
                });
                return () => split.revert();
            });
        },
        { scope: ref, dependencies: [lang, effect], revertOnUpdate: true },
    );

    return (
        // Keyed by language: SplitText rewrites the DOM, so a new language needs a fresh element.
        <Tag key={lang} ref={ref} className={className}>
            {children}
        </Tag>
    );
}
