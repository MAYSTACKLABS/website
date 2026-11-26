import { useLocale } from "../../i18n/useLocale.ts";
import { usePageMeta } from "../../hooks/usePageMeta.ts";
import { services } from "../../content/services.ts";
import { PageIntro } from "../../components/ui/PageIntro.tsx";
import { ButtonLink } from "../../components/ui/ButtonLink.tsx";
import { ServiceVisual } from "../../components/ServiceVisual.tsx";
import { Reveal } from "../../motion/Reveal.tsx";
import { ProcessScene } from "../home/ProcessScene.tsx";
import "./Services.css";

export default function Services() {
    const { t, pick } = useLocale();
    usePageMeta(t("services.meta.title"), t("services.meta.description"));

    return (
        <>
            <PageIntro
                eyebrow={t("services.eyebrow")}
                title={t("services.title")}
                lead={t("services.lead")}
            />

            {services.map((service, index) => (
                <section key={service.id} id={service.id} className="service container">
                    <Reveal className="service__copy">
                        <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                        <h2 className="display service__title">{pick(service.title)}</h2>
                        <p className="muted">{pick(service.description)}</p>
                        <ul className="tags">
                            {service.deliverables.map((item) => (
                                <li key={item.en}>{pick(item)}</li>
                            ))}
                        </ul>
                        <ButtonLink to="/contact" variant="text">
                            {t("services.discuss")}
                        </ButtonLink>
                    </Reveal>
                    <Reveal stagger={0} effect="unveil">
                        <ServiceVisual service={service} />
                    </Reveal>
                </section>
            ))}

            <ProcessScene />
        </>
    );
}
