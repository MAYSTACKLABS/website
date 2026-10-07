import logo from "../../assets/logos/white.png";

/** The image anchor and trail share the same path, beneath the mountain layer. */
export default function HeroFlight() {
    return <div className="hero-brand-flight" aria-hidden="true">
        <svg viewBox="0 0 430 600" fill="none" className="hero-brand-trails">
            <path pathLength="1" d="M150 590C105 390 245 210 347 120" />
            <path pathLength="1" d="M150 590C130 390 260 220 347 120" />
            <g className="hero-flying-mark"><image href={logo} x="-65" y="-120" width="148" height="148" /></g>
        </svg>
    </div>;
}
