import cloudBank from "../../../assets/hero/optimized/cloud-bank.webp";

export default function HeroTransition() {
    return (
        <div className="ms-hero-transition" aria-hidden="true">
            <div className="ms-hero-transition-parallax">
                <div className="ms-hero-transition-entrance">
                    <img src={cloudBank} alt="" />
                </div>
            </div>
        </div>
    );
}
