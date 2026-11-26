import mountainsDay from "../assets/scene/mountains.webp";
import mountainsNight from "../assets/scene/mountains-night.webp";
import cloudsDay from "../assets/scene/clouds.webp";
import cloudsNight from "../assets/scene/clouds-night.webp";
import sun from "../assets/scene/sun.webp";
import moon from "../assets/scene/moon.webp";
import "./Scenery.css";

/**
 * The Maystack range sitting in a sea of clouds, as on the first site. The night versions are
 * separate pre-tinted files, so the browser never recolours a large image while scrolling.
 * The sun or moon lives inside the mountain's own box, pinned behind the highest peak,
 * so it stays centred on the tip at every screen size.
 */
export function Scenery({
    className = "",
    orb = false,
    eager = false,
}: {
    className?: string;
    orb?: boolean;
    eager?: boolean;
}) {
    const load = eager ? "eager" : "lazy";
    const priority = eager ? "high" : "auto";
    return (
        <div className={`scenery ${className}`} aria-hidden="true">
            <div className="scenery__range">
                {orb && (
                    <div className="scenery__orb">
                        <img className="scenery__sun" src={sun} alt="" loading={load} />
                        <img className="scenery__moon" src={moon} alt="" loading={load} />
                    </div>
                )}
                <img className="scenery__day" src={mountainsDay} alt="" loading={load} fetchPriority={priority} />
                <img className="scenery__night" src={mountainsNight} alt="" loading={load} fetchPriority={priority} />
            </div>
            <div className="scenery__clouds">
                <img className="scenery__day" src={cloudsDay} alt="" loading={load} fetchPriority={priority} />
                <img className="scenery__night" src={cloudsNight} alt="" loading={load} fetchPriority={priority} />
            </div>
        </div>
    );
}
