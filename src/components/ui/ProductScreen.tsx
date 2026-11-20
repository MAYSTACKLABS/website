import { Screenshot } from "./Screenshot.tsx";
import "./ProductScreen.css";

type Props = {
    src: string;
    alt: string;
    device?: "desktop" | "phone";
    sizes?: string;
    className?: string;
    eager?: boolean;
};

/** A product screenshot in a quiet frame: a wide window, or a phone-shaped screen. */
export function ProductScreen({
    src,
    alt,
    device = "desktop",
    sizes,
    className = "",
    eager,
}: Props) {
    const phoneSizes = "(max-width: 800px) 70vw, 20rem";
    return (
        <figure className={`screen screen--${device} ${className}`}>
            <Screenshot
                src={src}
                alt={alt}
                sizes={sizes ?? (device === "phone" ? phoneSizes : undefined)}
                eager={eager}
            />
        </figure>
    );
}
