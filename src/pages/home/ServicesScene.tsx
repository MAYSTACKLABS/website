import { useRef } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { services, type Service } from "../../content/services.ts";
import { DeviceSet, Laptop, Phone } from "../../components/ui/Devices.tsx";
import { gsap, MOTION, MOTION_DESKTOP, useGSAP } from "../../motion/gsap.ts";
import "./ServicesScene.css";

/** Each service shown on the device it lives on. */
function Visual({ service }: { service: Service }) {
    const { pick } = useLocale();
    const { showcase } = service;
    const alt = pick(showcase.title);

    switch (service.id) {
        case "design":
            // A design board: screens laid out as on a canvas, spreading apart as the card arrives.
            return (
                <div className="board">
                    <div className="board__sheet board__sheet--wide">
                        <img src={showcase.desktop[0]} alt={alt} loading="lazy" />
                    </div>
                    <div className="board__sheet board__sheet--tall board__sheet--a">
                        <img src={showcase.mobile[0]} alt="" loading="lazy" />
                    </div>
                    <div className="board__sheet board__sheet--tall board__sheet--b">
                        <img src={showcase.mobile[1] ?? showcase.mobile[0]} alt="" loading="lazy" />
                    </div>
                    <span className="board__cursor" aria-hidden="true" />
                </div>
            );
        case "mobile":
            return (
                <div className="phones">
                    <Phone src={showcase.mobile[1] ?? showcase.mobile[0]} alt="" className="phones__back" />
                    <Phone src={showcase.mobile[0]} alt={alt} className="phones__front" />
                </div>
            );
        case "web":
            return <DeviceSet desktop={showcase.desktop[0]} mobile={showcase.mobile[0]} alt={alt} />;
        default:
            return <Laptop src={showcase.desktop[0]} alt={alt} />;
    }
}

/**
 * Stacked cards: each service holds near the top while the next slides up over it,
 * and the one underneath steps back.
 */
export function ServicesScene() {
    const { t, pick } = useLocale();
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_DESKTOP, () => {
                const cards = gsap.utils.toArray<HTMLElement>(".services__card");
                cards.forEach((card, i) => {
                    const next = cards[i + 1];
                    if (next) {
                        gsap.to(card, {
                            scale: 0.95,
                            filter: "brightness(0.82)",
                            ease: "none",
                            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
                        });
                    }
                });
            });
            mm.add(MOTION, () => {
                gsap.from(".board__sheet--a", {
                    x: -40, y: 30, rotate: -6, scrollTrigger: { trigger: ".board", start: "top 85%", end: "top 35%", scrub: 1 },
                });
                gsap.from(".board__sheet--b", {
                    x: 60, y: 50, rotate: 8, scrollTrigger: { trigger: ".board", start: "top 85%", end: "top 35%", scrub: 1 },
                });
                gsap.fromTo(
                    ".board__cursor",
                    { x: "-120%", y: "160%" },
                    { x: "0%", y: "0%", scrollTrigger: { trigger: ".board", start: "top 70%", end: "top 30%", scrub: 1 } },
                );

                // The phones turn in 3D as the card travels through the screen.
                gsap.fromTo(
                    ".phones__front",
                    { rotateY: -32, rotateX: 8 },
                    { rotateY: 14, rotateX: -4, ease: "none", scrollTrigger: { trigger: ".phones", start: "top bottom", end: "bottom top", scrub: 1 } },
                );
                gsap.fromTo(
                    ".phones__back",
                    { rotateY: -18, x: "8%" },
                    { rotateY: 22, x: "-6%", ease: "none", scrollTrigger: { trigger: ".phones", start: "top bottom", end: "bottom top", scrub: 1 } },
                );
            });
        },
        { scope: ref },
    );

    return (
        <section ref={ref} className="services" aria-labelledby="services-title">
            <div className="container">
                <h2 id="services-title" className="services__title">
                    {t("home.services.title")}
                </h2>

                <ol className="services__list">
                    {services.map((service, index) => (
                        <li
                            key={service.id}
                            className="services__card"
                            style={{ "--i": index } as React.CSSProperties}
                        >
                            <div className="services__copy">
                                <span className="services__index">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <h3 className="display services__name">{pick(service.title)}</h3>
                                <p className="muted">{pick(service.description)}</p>
                                <ul className="tags">
                                    {service.deliverables.map((item) => (
                                        <li key={item.en}>{pick(item)}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="services__visual" role="img" aria-label={pick(service.title)}>
                                <Visual service={service} />
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
