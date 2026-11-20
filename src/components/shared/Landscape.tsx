import { useEffect, useState } from "react";
import mountains from "../../assets/hero/optimized/mountains.webp";
import clouds from "../../assets/generated/playful-cloud-divider.webp";
import HeroFlight from "./HeroFlight.tsx";
import sun from "../../assets/hero/optimized/sun.webp";
import moon from "../../assets/hero/optimized/moon.webp";
import { useTheme } from "../../context/ThemeContext.tsx";

/** Mount the off-theme orb once the page is idle, so the first load fetches only one. */
function useIdle() {
    const [idle, setIdle] = useState(false);
    useEffect(() => {
        if ("requestIdleCallback" in window) {
            const id = window.requestIdleCallback(() => setIdle(true), { timeout: 3000 });
            return () => window.cancelIdleCallback(id);
        }
        const id = setTimeout(() => setIdle(true), 2000);
        return () => clearTimeout(id);
    }, []);
    return idle;
}

export default function Landscape({ className = "", orb = true, flight = false }: { className?: string; orb?: boolean; flight?: boolean }) {
    const { theme } = useTheme();
    const idle = useIdle();
    return <div className={`landscape ${className}`} aria-hidden="true">
        <div className="landscape-scenery">
        {orb && <div className="landscape-orb">
            {(theme === "light" || idle) && <img className="landscape-sun" src={sun} alt="" decoding="async" />}
            {(theme === "dark" || idle) && <img className="landscape-moon" src={moon} alt="" decoding="async" />}
        </div>}
        {flight && <HeroFlight />}
        <img className="landscape-mountain" src={mountains} alt="" decoding="async" />
        </div>
        <img className="landscape-clouds" src={clouds} alt="" decoding="async" />
    </div>;
}
