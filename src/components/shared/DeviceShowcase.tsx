import laptopFrame from "../../assets/generated/laptop-frame-v2.png";
import PhoneMockup from "./PhoneMockup.tsx";

type Props = { desktop: string; mobile?: string; name: string; href?: string; priority?: boolean };
export default function DeviceShowcase({ desktop, mobile, name, href, priority = false }: Props) {
    const laptop = <>
        <img className="device-laptop-frame" src={laptopFrame} alt="" aria-hidden="true" />
        <span className="device-laptop-screen"><img src={desktop} alt={name} loading={priority ? "eager" : "lazy"} /></span>
    </>;
    return (
        <div className="device-showcase">
            {href ? <a className="device-laptop" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={name}>{laptop}</a> : <div className="device-laptop">{laptop}</div>}
            {mobile && <PhoneMockup className="device-phone" image={mobile} name={`${name} — mobile`} priority={priority} />}
        </div>
    );
}
