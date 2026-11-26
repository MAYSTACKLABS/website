import { useRef } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { services } from "../../content/services.ts";
import { ServiceVisual } from "../../components/ServiceVisual.tsx";
import { gsap, MOTION_DESKTOP, useGSAP } from "../../motion/gsap.ts";
import "./ServicesScene.css";

/**
 * Pinned on desktop: one service at a time. Its words swap on the left while its screen
 * turns into view in 3D on the right. Phones and reduced motion get a plain list.
 */
export function ServicesScene() {
    const { t, pick } = useLocale();
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION_DESKTOP, () => {
                const copies = gsap.utils.toArray<HTMLElement>(".services__item");
                const screens = gsap.utils.toArray<HTMLElement>(".services__screen");
                const counter = ref.current!.querySelector(".services__count")!;

                gsap.set([copies.slice(1), screens.slice(1)], { autoAlpha: 0 });
                const tl = gsap.timeline({
                    defaults: { duration: 1, ease: "power3.inOut" },
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top top",
                        end: `+=${services.length * 100}%`,
                        pin: true,
                        scrub: 1,
                        snap: { snapTo: "labels", duration: 0.6, ease: "power2.inOut" },
                        onUpdate: ({ progress }) => {
                            const index = Math.min(
                                services.length - 1,
                                Math.round(progress * (services.length - 1)),
                            );
                            counter.textContent = String(index + 1).padStart(2, "0");
                        },
                    },
                });

                tl.addLabel("s0");
                for (let i = 1; i < services.length; i++) {
                    tl.to(copies[i - 1], { autoAlpha: 0, y: -60 })
                        .to(screens[i - 1], { autoAlpha: 0, y: -50, scale: 0.97 }, "<")
                        .fromTo(copies[i], { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0 }, "<0.25")
                        .fromTo(screens[i], { autoAlpha: 0, y: 50, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1 }, "<")
                        .addLabel(`s${i}`);
                }
            });
        },
        { scope: ref },
    );

    return (
        <section ref={ref} className="services" aria-labelledby="services-title">
            <div className="services__inner container">
                <header className="services__head">
                    <h2 id="services-title" className="services__title">
                        {t("home.services.title")}
                    </h2>
                    <p className="services__count-wrap" aria-hidden="true">
                        <span className="services__count">01</span> /{" "}
                        {String(services.length).padStart(2, "0")}
                    </p>
                </header>

                <ol className="services__list">
                    {services.map((service) => (
                        <li key={service.id} className="services__row">
                            <div className="services__item">
                                <h3 className="display services__name">{pick(service.title)}</h3>
                                <p className="muted">{pick(service.description)}</p>
                            </div>
                            <ServiceVisual service={service} className="services__screen" />
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
