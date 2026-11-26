import type { ReactNode } from "react";
import laptopFrame from "../../assets/scene/laptop-frame-v2.webp";
import phoneFrame from "../../assets/scene/iphone-titanium-frame.webp";
import { Screenshot } from "./Screenshot.tsx";
import "./Devices.css";

type Common = {
    /** One screenshot; or pass children to fill the screen yourself (e.g. a slideshow). */
    src?: string;
    alt?: string;
    children?: ReactNode;
    className?: string;
    eager?: boolean;
    sizes?: string;
};

/** A laptop: the frame image with a screen cut into it. */
export function Laptop({
    src,
    alt = "",
    children,
    className = "",
    eager,
    sizes = "(max-width: 800px) 80vw, 40vw",
}: Common) {
    return (
        <div className={`laptop ${className}`}>
            <img className="laptop__frame" src={laptopFrame} alt="" aria-hidden="true" decoding="async" />
            <span className="laptop__screen">
                {src && <Screenshot src={src} alt={alt} sizes={sizes} eager={eager} />}
                {children}
            </span>
        </div>
    );
}

/** A whole phone, frame and screen, never cropped. */
export function Phone({ src, alt = "", children, className = "", eager }: Common) {
    return (
        <div className={`phone ${className}`}>
            <img className="phone__frame" src={phoneFrame} alt="" aria-hidden="true" decoding="async" />
            <span className="phone__screen">
                {src && <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />}
                {children}
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
