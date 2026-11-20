import type { Service } from "../content/services.ts";
import { useLocale } from "../i18n/useLocale.ts";
import { ProductScreen } from "./ui/ProductScreen.tsx";

/** A service illustrated by its showcase project: a phone for mobile, a window for the rest. */
export function ServiceVisual({ service, className }: { service: Service; className?: string }) {
    const { pick } = useLocale();
    const { showcase } = service;
    const phone = service.id === "mobile";

    return (
        <ProductScreen
            className={className}
            device={phone ? "phone" : "desktop"}
            src={phone ? showcase.mobile[0] : showcase.desktop[0]}
            alt={pick(showcase.title)}
            sizes={phone ? undefined : "(max-width: 800px) 92vw, 50vw"}
        />
    );
}
