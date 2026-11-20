import { Suspense } from "react";
import type { Service } from "../content/services.ts";
import { demos } from "../demos/index.ts";
import { useLocale } from "../i18n/useLocale.ts";
import { ProductScreen } from "./ui/ProductScreen.tsx";

/**
 * A service shown by its Stageshow demo. While the demo's code loads, the showcase
 * project's screenshot stands in: a phone for mobile, a window for the rest.
 */
export function ServiceVisual({
    service,
    className = "",
}: {
    service: Service;
    className?: string;
}) {
    const { pick } = useLocale();
    const Demo = demos[service.id];
    const phone = service.id === "mobile";
    const { showcase } = service;

    const fallback = (
        <ProductScreen
            device={phone ? "phone" : "desktop"}
            src={phone ? showcase.mobile[0] : showcase.desktop[0]}
            alt={pick(showcase.title)}
            sizes={phone ? undefined : "(max-width: 800px) 92vw, 50vw"}
        />
    );

    return (
        <div className={`service-visual ${className}`} role="img" aria-label={pick(service.title)}>
            <Suspense fallback={fallback}>
                <Demo />
            </Suspense>
        </div>
    );
}
