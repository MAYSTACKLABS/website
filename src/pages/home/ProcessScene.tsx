import { useRef } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { process } from "../../content/process.ts";
import { gsap, MOTION_DESKTOP, useGSAP } from "../../motion/gsap.ts";
import "./ProcessScene.css";

/** Pinned on desktop: one step at a time, swapped through a focus pull, with a line of five checkpoints. */
export function ProcessScene() {
    const { t, pick } = useLocale();
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION_DESKTOP, () => {
                const steps = gsap.utils.toArray<HTMLElement>(".process__step");
                const dots = gsap.utils.toArray<HTMLElement>(".process__dot");
                gsap.set(steps.slice(1), { autoAlpha: 0 });

                const tl = gsap.timeline({
                    defaults: { duration: 1, ease: "power3.inOut" },
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top top",
                        end: `+=${process.length * 80}%`,
                        pin: true,
                        scrub: 1,
                        snap: { snapTo: "labels", duration: 0.5 },
                    },
                });

                tl.addLabel("p0").set(dots[0], { className: "process__dot is-reached" });
                for (let i = 1; i < steps.length; i++) {
                    tl.to(steps[i - 1], { autoAlpha: 0, filter: "blur(14px)", scale: 1.04 })
                        .fromTo(
                            steps[i],
                            { autoAlpha: 0, filter: "blur(14px)", scale: 0.96 },
                            { autoAlpha: 1, filter: "blur(0px)", scale: 1 },
                            "<0.35",
                        )
                        .to(".process__fill", { scaleX: i / (steps.length - 1), ease: "none" }, "<")
                        .set(dots[i], { className: "process__dot is-reached" })
                        .addLabel(`p${i}`);
                }
            });
        },
        { scope: ref },
    );

    return (
        <section ref={ref} className="process" aria-labelledby="process-title">
            <div className="process__inner container">
                <header>
                    <p className="eyebrow">{t("home.process.eyebrow")}</p>
                    <h2 id="process-title" className="process__title">
                        {t("home.process.title")}
                    </h2>
                </header>

                <ol className="process__steps">
                    {process.map((step, index) => (
                        <li key={step.title.en} className="process__step">
                            <span className="process__number" aria-hidden="true">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3 className="display process__name">{pick(step.title)}</h3>
                                <p className="muted">{pick(step.text)}</p>
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="process__line" aria-hidden="true">
                    <span className="process__fill" />
                    {process.map((step) => (
                        <span key={step.title.en} className="process__dot" />
                    ))}
                </div>
            </div>
        </section>
    );
}
