import { useRef } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { services } from "../../content/services.ts";
import { gsap, MOTION, useGSAP } from "../../motion/gsap.ts";
import "./HeroStack.css";

// Bottom to top: what everything stands on, up to what people see first.
const ORDER = ["platforms", "web", "mobile", "design"] as const;
const GAP = 46;

/** One glass layer's miniature: just enough UI to say which layer it is. */
function Mini({ id }: { id: (typeof ORDER)[number] }) {
    switch (id) {
        case "platforms":
            return (
                <span className="mini mini--platforms">
                    <i className="mini__side" />
                    {[0.5, 0.75, 0.6, 0.95, 0.7].map((h, i) => (
                        <i key={i} className="mini__bar" style={{ height: `${h * 52}%`, left: `${34 + i * 12}%` }} />
                    ))}
                </span>
            );
        case "web":
            return (
                <span className="mini mini--web">
                    <i className="mini__browser" />
                    <i className="mini__headline" />
                    <i className="mini__headline mini__headline--short" />
                    <i className="mini__button" />
                    <i className="mini__image" />
                </span>
            );
        case "mobile":
            return (
                <span className="mini mini--mobile">
                    <i className="mini__phone" />
                    <i className="mini__phone mini__phone--b" />
                </span>
            );
        default:
            return (
                <span className="mini mini--design">
                    <i className="mini__frame" />
                    <i className="mini__select" />
                    <i className="mini__cursor" />
                </span>
            );
    }
}

/**
 * Maystack, literally: four glass layers (platforms, web, mobile, design) stacked in 3D.
 * They settle into place on arrival, lean towards the pointer, and draw apart as you scroll.
 */
export function HeroStack() {
    const { pick } = useLocale();
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                const scene = ref.current!.querySelector<HTMLElement>(".stack__scene")!;
                const layers = gsap.utils.toArray<HTMLElement>(".stack__layer");

                gsap.set(scene, { rotationX: 56, rotationZ: -42 });
                gsap.set(layers, { z: (i) => i * GAP });

                // Arrival: each layer drops onto the one below.
                gsap.from(layers, {
                    z: (i) => i * GAP + 220,
                    autoAlpha: 0,
                    duration: 1.4,
                    ease: "power3.out",
                    stagger: 0.12,
                    delay: 0.3,
                });

                // Scroll: the stack opens up, showing each layer on its own.
                gsap.to(layers, {
                    z: (i) => i * GAP * 2.4,
                    ease: "none",
                    scrollTrigger: { trigger: ref.current, start: "top 30%", end: "bottom top", scrub: 0.6 },
                });

                // Pointer: the whole stack leans a little towards the cursor.
                const tiltX = gsap.quickTo(scene, "rotationX", { duration: 0.8, ease: "power3.out" });
                const tiltZ = gsap.quickTo(scene, "rotationZ", { duration: 0.8, ease: "power3.out" });
                const move = (event: PointerEvent) => {
                    if (event.pointerType !== "mouse") return;
                    const x = event.clientX / innerWidth - 0.5;
                    const y = event.clientY / innerHeight - 0.5;
                    tiltX(56 - y * 10);
                    tiltZ(-42 + x * 12);
                };
                addEventListener("pointermove", move);
                return () => removeEventListener("pointermove", move);
            });
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className="stack" aria-hidden="true">
            <div className="stack__scene">
                {ORDER.map((id, i) => {
                    const service = services.find((s) => s.id === id)!;
                    return (
                        <div key={id} className={`stack__layer stack__layer--${id}`} style={{ "--i": i } as React.CSSProperties}>
                            <Mini id={id} />
                            <span className="stack__label">{pick(service.title)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
