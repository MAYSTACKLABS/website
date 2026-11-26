import { useRef } from "react";
import type { Project } from "../../content/projects/types.ts";
import { Laptop, Phone } from "../../components/ui/Devices.tsx";
import { Screenshot } from "../../components/ui/Screenshot.tsx";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "../../motion/gsap.ts";
import "./Showcase.css";

/**
 * One laptop and one phone, side by side. The section holds in the middle of the screen while
 * both screens scroll through the project from top to bottom, as if you were using the site.
 * Each screen holds one tall strip: the project's pages stacked (or one full-page capture).
 */
export function Showcase({ project, name }: { project: Project; name: string }) {
    const ref = useRef<HTMLElement>(null);
    // A full-page capture of the live site if there is one, else the screens stacked.
    const desktop = project.fullDesktop ? [project.fullDesktop] : project.desktop;
    const mobile = project.fullMobile ? [project.fullMobile] : project.mobile;
    const pages = project.fullDesktop ? 5 : Math.max(desktop.length, mobile.length);

    useGSAP(
        () => {
            gsap.matchMedia().add(MOTION, () => {
                const strips = gsap.utils.toArray<HTMLElement>(".showcase__strip");
                // How far each strip must travel: its height minus the screen it sits in.
                const travel = (strip: HTMLElement) => -(strip.scrollHeight - strip.parentElement!.clientHeight);

                const tl = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "center center",
                        end: `+=${pages * 70}%`,
                        pin: true,
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                    },
                });
                strips.forEach((strip) => tl.to(strip, { y: () => travel(strip) }, 0));
            });
        },
        { scope: ref },
    );

    // Strip heights are only known once the images load.
    const refresh = () => ScrollTrigger.refresh();

    return (
        <section ref={ref} className="showcase container" aria-label={name}>
            <div className="showcase__stage">
                <Laptop className="showcase__laptop">
                    <span className="showcase__strip">
                        {desktop.map((src, i) => (
                            <Screenshot
                                key={src}
                                src={src}
                                alt={`${name} — ${i + 1}`}
                                sizes="(max-width: 800px) 70vw, 55vw"
                                eager
                                onLoad={refresh}
                            />
                        ))}
                    </span>
                </Laptop>
                {mobile.length > 0 && (
                    <Phone className="showcase__phone">
                        <span className="showcase__strip">
                            {mobile.map((src, i) => (
                                <img key={src} src={src} alt={`${name} — mobile ${i + 1}`} decoding="async" onLoad={refresh} />
                            ))}
                        </span>
                    </Phone>
                )}
            </div>
        </section>
    );
}
