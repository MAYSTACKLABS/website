import { screenshotSrcSet } from "../../utils/responsiveImage.ts";

type Props = {
    src: string;
    alt: string;
    /** The width the image is shown at, as a CSS `sizes` value. */
    sizes?: string;
    className?: string;
    eager?: boolean;
};

/** A project screenshot that picks its 800px or 1600px file to suit the screen. */
export function Screenshot({
    src,
    alt,
    sizes = "(max-width: 800px) 92vw, 60vw",
    className,
    eager,
}: Props) {
    return (
        <img
            className={className}
            src={src}
            srcSet={screenshotSrcSet(src)}
            sizes={sizes}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
        />
    );
}
