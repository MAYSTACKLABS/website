import laptopFrame from "../../assets/generated/laptop-frame-v2.webp";
import PhoneMockup from "./PhoneMockup.tsx";
import { screenshotSrcSet } from "../../utils/responsiveImage.ts";

type Props = { desktop: string; mobile?: string; name: string; href?: string; priority?: boolean };
export default function DeviceShowcase({ desktop, mobile, name, href, priority = false }: Props) {
    const laptop = <>
        <img className="device-laptop-frame" src={laptopFrame} alt="" aria-hidden="true" loading={priority ? "eager" : "lazy"} decoding="async" />
        <span className="device-laptop-screen"><img src={desktop} srcSet={screenshotSrcSet(desktop)} sizes="(max-width: 800px) 70vw, 480px" alt={name} loading={priority ? "eager" : "lazy"} decoding="async" /></span>
    </>;
    return (
        <div className="device-showcase">
            {href ? <a className="device-laptop" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={name}>{laptop}</a> : <div className="device-laptop">{laptop}</div>}
            {mobile && <PhoneMockup className="device-phone" image={mobile} name={`${name} — mobile`} priority={priority} />}
        </div>
    );
}
