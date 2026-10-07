import mountains from "../../assets/hero/optimized/mountains.webp";
import clouds from "../../assets/generated/playful-cloud-divider.png";
import HeroFlight from "./HeroFlight.tsx";
import sun from "../../assets/hero/optimized/sun.webp";
import moon from "../../assets/hero/optimized/moon.webp";

export default function Landscape({ className = "", orb = true, flight = false }: { className?: string; orb?: boolean; flight?: boolean }) {
    return <div className={`landscape ${className}`} aria-hidden="true">
        <div className="landscape-scenery">
        {orb && <div className="landscape-orb">
            <img className="landscape-sun" src={sun} alt="" />
            <img className="landscape-moon" src={moon} alt="" />
        </div>}
        {flight && <HeroFlight />}
        <img className="landscape-mountain" src={mountains} alt="" />
        </div>
        <img className="landscape-clouds" src={clouds} alt="" />
    </div>;
}
