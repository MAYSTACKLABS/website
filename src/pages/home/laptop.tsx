import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import laptopVideo from "../../assets/images/laptop-scrub.mp4";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    ["20+", "Projects Delivered"],
    ["98%", "Client Satisfaction"],
    ["80+", "Happy Clients"],
    ["5+", "Years Experience"],
];

export default function LaptopShowcase() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement | null>(null);
    const laptopVideoRef = useRef<HTMLVideoElement | null>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const laptopVideo = laptopVideoRef.current;

        if (!section || !laptopVideo) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const videoState = { time: 0 };

        let ctx: gsap.Context | undefined;

        const createTimeline = () => {
            const duration = laptopVideo.duration || 1;

            laptopVideo.pause();
            laptopVideo.currentTime = prefersReducedMotion ? duration : 0;
            videoState.time = laptopVideo.currentTime;

            if (prefersReducedMotion) {
                return;
            }

            ctx = gsap.context(() => {
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=115%",
                        scrub: 0.2,
                        pin: ".home-laptop-scroll",
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                timeline.to(videoState, {
                    time: duration,
                    ease: "none",
                    duration: 1,
                    onUpdate: () => {
                        laptopVideo.currentTime = videoState.time;
                    },
                });
            }, section);
        };

        if (laptopVideo.readyState >= 1) {
            createTimeline();
        } else {
            laptopVideo.addEventListener("loadedmetadata", createTimeline, { once: true });
        }

        return () => {
            laptopVideo.removeEventListener("loadedmetadata", createTimeline);
            ctx?.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="home-laptop-showcase" id="laptop-showcase">
            <div className="home-laptop-scroll">
                <div className="home-laptop-stage ms-animate" aria-label={t("home.laptop.previewAlt")}>
                    <video
                        ref={laptopVideoRef}
                        src={laptopVideo}
                        aria-label="MayStack laptop workspace"
                        className="home-laptop-frame"
                        muted
                        playsInline
                        preload="auto"
                    />
                </div>
            </div>

            <div className="py-12 md:py-14">
                <div className="ms-container">
                    <div className="ms-glass-panel grid gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
                        {stats.map(([value, label]) => (
                            <div key={label}>
                                <div className="text-5xl font-bold text-[#18dbc9]">{value}</div>
                                <div className="mt-3 text-sm font-medium" style={{ color: "var(--ms-muted-text)" }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
