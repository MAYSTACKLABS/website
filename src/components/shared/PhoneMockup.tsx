import frame from "../../assets/generated/iphone-titanium-frame.png";

type Props = { image: string; name: string; priority?: boolean; className?: string };

/** One calibrated screen aperture, reused wherever a phone is shown. */
export default function PhoneMockup({ image, name, priority = false, className = "" }: Props) {
    return <div className={`phone-mockup ${className}`}>
        <img className="phone-mockup-frame" src={frame} alt="" aria-hidden="true" loading={priority ? "eager" : "lazy"} />
        <div className="phone-mockup-screen"><img src={image} alt={name} loading={priority ? "eager" : "lazy"} /></div>
        <span className="phone-mockup-island" aria-hidden="true"><i /></span>
    </div>;
}
