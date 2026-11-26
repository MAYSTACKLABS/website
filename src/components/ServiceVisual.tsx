import type { Service } from "../content/services.ts";
import { useLocale } from "../i18n/useLocale.ts";
import { DeviceSet, Laptop, Phone } from "./ui/Devices.tsx";
import "./ServiceVisual.css";

/**
 * Each service on the device it lives on, always whole (never a cropped phone):
 * - UI/UX: a laptop where a wireframe is drawn, then wiped away to reveal the finished screen;
 * - Mobile: two full phones standing in 3D, gently floating;
 * - Web: a laptop with its phone version in front;
 * - Platforms: a laptop running the platform.
 */
export function ServiceVisual({ service, className = "" }: { service: Service; className?: string }) {
    const { pick } = useLocale();
    const { showcase } = service;
    const name = pick(showcase.title);

    let visual;
    switch (service.id) {
        case "design":
            visual = (
                <Laptop src={showcase.desktop[0]} alt={name}>
                    <span className="sv-wire" aria-hidden="true">
                        <i className="sv-wire__nav" />
                        <i className="sv-wire__hero" />
                        <i className="sv-wire__line" />
                        <i className="sv-wire__line sv-wire__line--short" />
                        <i className="sv-wire__button" />
                        <i className="sv-wire__image" />
                    </span>
                </Laptop>
            );
            break;
        case "mobile":
            visual = (
                <div className="sv-phones">
                    <Phone src={showcase.mobile[1] ?? showcase.mobile[0]} className="sv-phones__back" />
                    <Phone src={showcase.mobile[0]} alt={name} className="sv-phones__front" />
                </div>
            );
            break;
        case "web":
            visual = <DeviceSet desktop={showcase.desktop[0]} mobile={showcase.mobile[0]} alt={name} />;
            break;
        default:
            visual = <Laptop src={showcase.desktop[1] ?? showcase.desktop[0]} alt={name} />;
    }

    return (
        <div className={`service-visual service-visual--${service.id} ${className}`} role="img" aria-label={pick(service.title)}>
            {visual}
        </div>
    );
}
