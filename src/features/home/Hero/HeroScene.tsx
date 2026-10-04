import mountains from "../../../assets/hero/optimized/mountains.webp";
import moon from "../../../assets/hero/optimized/moon.webp";
import sun from "../../../assets/hero/optimized/sun.webp";
import bird from "../../../assets/logos/white.png";

const STARS = [
    { left: "8%", top: "20%", size: 3, delay: "0s" },
    { left: "16%", top: "39%", size: 2, delay: "1.2s" },
    { left: "31%", top: "14%", size: 4, delay: "0.6s" },
    { left: "43%", top: "31%", size: 2, delay: "1.8s" },
    { left: "55%", top: "12%", size: 3, delay: "0.3s" },
    { left: "64%", top: "28%", size: 2, delay: "2.2s" },
    { left: "75%", top: "16%", size: 4, delay: "1s" },
    { left: "88%", top: "34%", size: 2, delay: "2.7s" },
    { left: "93%", top: "11%", size: 3, delay: "0.8s" },
];

export default function HeroScene({ mountainAlt }: { mountainAlt: string }) {
    return (
        <>
            <div className="ms-alpine-sky ms-alpine-sky-day" aria-hidden="true" />
            <div className="ms-alpine-sky ms-alpine-sky-night" aria-hidden="true" />
            <div className="ms-alpine-stars" aria-hidden="true">
                {STARS.map((star, index) => (
                    <span key={index} style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                        animationDelay: star.delay,
                    }} />
                ))}
            </div>

            <div className="ms-alpine-orbit-parallax" aria-hidden="true">
                <div className="ms-alpine-orbit-entrance">
                    <div className="ms-alpine-orbit">
                        <img className="ms-alpine-orb ms-alpine-sun" src={sun} alt="" />
                        <img className="ms-alpine-orb ms-alpine-moon" src={moon} alt="" />
                        <svg className="ms-alpine-orbit-path" viewBox="0 0 500 500" fill="none">
                            <ellipse cx="250" cy="250" rx="232" ry="174" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="ms-alpine-brand-parallax" aria-hidden="true">
                <div className="ms-alpine-brand-entrance">
                    <div className="ms-alpine-brand-flight">
                        <svg className="ms-alpine-brand-trails" viewBox="0 0 430 150" fill="none">
                            <path d="M8 132C116 143 236 104 353 28" />
                            <path d="M38 145C154 151 264 113 374 46" />
                        </svg>
                        <img className="ms-alpine-brand-bird" src={bird} alt="" />
                    </div>
                </div>
            </div>

            <div className="ms-alpine-mountain-layer">
                <div className="ms-alpine-mountain-parallax">
                    <div className="ms-alpine-mountain-entrance">
                        <img className="ms-alpine-mountain" src={mountains} alt={mountainAlt} />
                    </div>
                </div>
            </div>
        </>
    );
}
