import { useRef } from "react";
import type { Project } from "../../content/projects/types.ts";
import { Laptop, Phone } from "../../components/ui/Devices.tsx";
import { Screenshot } from "../../components/ui/Screenshot.tsx";
import { gsap, MOTION, useGSAP } from "../../motion/gsap.ts";
import "./Showcase.css";

/**
 * One laptop and one phone, side by side. The section holds in the middle of the screen and
 * scrolling slides both screens through the project's pages together.
 */
export function Showcase({ project, name }: { project: Project; name: string }) {
    const ref = useRef<HTMLElement>(null);
    const steps = Math.max(project.desktop.length, project.mobile.length);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                const desk = gsap.utils.toArray<HTMLElement>(".showcase__laptop .showcase__slide");
                const mob = gsap.utils.toArray<HTMLElement>(".showcase__phone .showcase__slide");
                const dots = gsap.utils.toArray<HTMLElement>(".showcase__dot");
                gsap.set([...desk.slice(1), ...mob.slice(1)], { autoAlpha: 1, yPercent: 100 });

                const tl = gsap.timeline({
                    defaults: { duration: 1, ease: "power2.inOut" },
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "center center",
                        end: `+=${(steps - 1) * 60}%`,
                        pin: true,
                        scrub: 0.6,
                        snap: steps > 1 ? { snapTo: "labels", duration: 0.5, ease: "power2.inOut" } : undefined,
                        onUpdate: ({ progress }) => {
                            const current = Math.round(progress * (steps - 1));
                            dots.forEach((dot, i) => dot.classList.toggle("is-current", i === current));
                        },
                    },
                });

                tl.addLabel("s0");
                for (let i = 1; i < steps; i++) {
                    // Each new page slides up over the last, on both screens at once.
                    const targets = [desk[i], mob[i]].filter(Boolean);
                    if (targets.length) tl.to(targets, { yPercent: 0 });
                    else tl.to({}, {});
                    tl.addLabel(`s${i}`);
                }
            });
        },
        { scope: ref },
    );

    return (
        <section ref={ref} className="showcase container" aria-label={name}>
            <div className="showcase__stage">
                <Laptop className="showcase__laptop">
                    {project.desktop.map((src, i) => (
                        <Screenshot
                            key={src}
                            className="showcase__slide"
                            src={src}
                            alt={`${name} — ${i + 1}`}
                            sizes="(max-width: 800px) 70vw, 55vw"
                            eager={i === 0}
                        />
                    ))}
                </Laptop>
                {project.mobile.length > 0 && (
                    <Phone className="showcase__phone">
                        {project.mobile.map((src, i) => (
                            <img
                                key={src}
                                className="showcase__slide"
                                src={src}
                                alt={`${name} — mobile ${i + 1}`}
                                loading={i === 0 ? "eager" : "lazy"}
                                decoding="async"
                            />
                        ))}
                    </Phone>
                )}
            </div>
            {steps > 1 && (
                <div className="showcase__dots" aria-hidden="true">
                    {Array.from({ length: steps }, (_, i) => (
                        <span key={i} className={`showcase__dot${i === 0 ? " is-current" : ""}`} />
                    ))}
                </div>
            )}
        </section>
    );
}
