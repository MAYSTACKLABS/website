import cloudBank from "../../../assets/generated/cloud-bank-v2.png";

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
