import { Link } from "react-router-dom";
import mark from "../../assets/logos/white.png";

/** The bird mark with the wordmark. The mark is white artwork, inverted in light mode. */
export function Logo() {
    return (
        <Link to="/" className="logo" aria-label="Maystack home">
            <img className="logo__mark" src={mark} alt="" width="34" height="26" />
            <span className="logo__word">Maystack</span>
        </Link>
    );
}
