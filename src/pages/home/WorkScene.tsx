import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../../i18n/useLocale.ts";
import { clientProjects } from "../../content/projects/index.ts";
import { ButtonLink } from "../../components/ui/ButtonLink.tsx";
import { Screenshot } from "../../components/ui/Screenshot.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import { gsap, MOTION_DESKTOP, useGSAP } from "../../motion/gsap.ts";
import "./WorkScene.css";

/**
 * Pinned on desktop: vertical scroll moves a row of projects sideways. Each card turns flat
 * and comes forward as it passes the centre, so one project is in focus at a time.
 */
export function WorkScene() {
    const { t, pick, isRtl } = useLocale();
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION_DESKTOP, () => {
                const track = ref.current!.querySelector<HTMLElement>(".work__track")!;
                const distance = () => (track.scrollWidth - innerWidth) * (isRtl ? 1 : -1);

                const slide = gsap.to(track, {
                    x: distance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top top",
                        end: () => `+=${Math.abs(distance())}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                // Each card: tilted on the way in, flat at the centre, tilted on the way out.
                gsap.utils.toArray<HTMLElement>(".work__card").forEach((card) => {
                    const tilt = isRtl ? -1 : 1;
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: slide,
                            start: isRtl ? "right left" : "left right",
                            end: isRtl ? "left right" : "right left",
                            scrub: true,
                        },
                    })
                        .fromTo(
                            card,
                            { rotateY: -28 * tilt, scale: 0.82, autoAlpha: 0.35 },
                            { rotateY: 0, scale: 1, autoAlpha: 1, ease: "power2.out" },
                        )
                        .to(card, {
                            rotateY: 28 * tilt,
                            scale: 0.82,
                            autoAlpha: 0.35,
                            ease: "power2.in",
                        });
                });
            });
        },
        { scope: ref, dependencies: [isRtl], revertOnUpdate: true },
    );

    return (
        <section ref={ref} className="work" aria-label={t("home.work.title")}>
            <header className="work__head container">
                <div>
                    <p className="eyebrow">{t("home.work.eyebrow")}</p>
                    <SplitHeading className="display">{t("home.work.title")}</SplitHeading>
                </div>
                <ButtonLink to="/portfolio" variant="text">
                    {t("home.work.all")}
                </ButtonLink>
            </header>

            <div className="work__viewport">
                <ol className="work__track">
                    {clientProjects.map((project, index) => (
                        <li key={project.slug} className="work__card">
                            <Link to={`/portfolio/${project.slug}`} className="work__link">
                                <Screenshot
                                    className="work__image"
                                    src={project.desktop[0]}
                                    alt={pick(project.title)}
                                    sizes="(max-width: 800px) 92vw, 62vw"
                                />
                                <div className="work__meta">
                                    <span className="work__index">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="work__name">{pick(project.title)}</h3>
                                    <p className="muted">{pick(project.intro)}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
