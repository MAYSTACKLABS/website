import mountainsDay from "../assets/scene/mountains.webp";
import cloudsDay from "../assets/scene/clouds.webp";
import sun from "../assets/scene/sun.webp";
import moon from "../assets/scene/moon.webp";
import "./Scenery.css";

/**
 * The Maystack range in a sea of bright clouds, as on the first site: the same colours by day
 * and by night, only the sun swaps for the moon.
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
            </div>
            <div className="scenery__clouds">
                <img className="scenery__day" src={cloudsDay} alt="" loading={load} fetchPriority={priority} />
            </div>
        </div>
    );
}
