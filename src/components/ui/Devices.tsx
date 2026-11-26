import laptopFrame from "../../assets/scene/laptop-frame-v2.webp";
import phoneFrame from "../../assets/scene/iphone-titanium-frame.webp";
import { Screenshot } from "./Screenshot.tsx";
import "./Devices.css";

type Common = { src: string; alt: string; className?: string; eager?: boolean; sizes?: string };

/** A screenshot inside the laptop frame. */
export function Laptop({ src, alt, className = "", eager, sizes = "(max-width: 800px) 80vw, 40vw" }: Common) {
    return (
        <div className={`laptop ${className}`}>
            <img className="laptop__frame" src={laptopFrame} alt="" aria-hidden="true" decoding="async" />
            <span className="laptop__screen">
                <Screenshot src={src} alt={alt} sizes={sizes} eager={eager} />
            </span>
        </div>
    );
}

/** A full phone, frame and screen, that can be tilted in 3D by its parent. */
export function Phone({ src, alt, className = "", eager }: Common) {
    return (
        <div className={`phone ${className}`}>
            <img className="phone__frame" src={phoneFrame} alt="" aria-hidden="true" decoding="async" />
            <span className="phone__screen">
                <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
            </span>
            <span className="phone__island" aria-hidden="true" />
        </div>
    );
}

/** A laptop with a phone resting in front of it. */
export function DeviceSet({
    desktop,
    mobile,
    alt,
    className = "",
    eager,
}: {
    desktop: string;
    mobile?: string;
    alt: string;
    className?: string;
    eager?: boolean;
}) {
    return (
        <div className={`device-set ${className}`}>
            <Laptop src={desktop} alt={alt} eager={eager} />
            {mobile && <Phone src={mobile} alt={`${alt} — mobile`} className="device-set__phone" eager={eager} />}
        </div>
    );
}
