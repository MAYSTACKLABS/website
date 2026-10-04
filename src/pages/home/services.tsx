import { ArrowUpRight, Code2, Globe2, Palette, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import mobileArt from "../../assets/home/services/mobile-app.png";
import webArt from "../../assets/home/services/website-builder.png";
import customArt from "../../assets/home/services/local-server.png";
import designArt from "../../assets/home/services/design-tools.png";

const serviceDefs = [
    { key: "mobile", Icon: Smartphone, art: mobileArt },
    { key: "web", Icon: Globe2, art: webArt },
    { key: "custom", Icon: Code2, art: customArt },
    { key: "uiux", Icon: Palette, art: designArt },
] as const;

export default function Services() {
    const { t } = useTranslation();

    return (
        <section className="ms-home-services" id="services">
            <div className="ms-container ms-services-layout">
                <div className="ms-home-section-intro ms-animate">
                    <p>{t("home.servicesSection.kicker")}</p>
                    <h2>{t("home.servicesSection.title")}</h2>
                    <span>{t("home.servicesSection.subtitle")}</span>
                    <Link className="ms-outline-cta" to="/services">
                        {t("home.servicesSection.link")}
                        <ArrowUpRight aria-hidden="true" />
                    </Link>
                </div>
                <div className="ms-capability-list">
                    {serviceDefs.map(({ key, Icon, art }, index) => (
                        <Link to="/services" className="ms-capability-row ms-animate" key={key}>
                            <small>{String(index + 1).padStart(2, "0")}</small>
                            <h3>{t(`home.services.${key}`)}</h3>
                            <p>{t(`home.services.${key}Desc`)}</p>
                            <img className="ms-capability-art" src={art} alt="" loading="lazy" aria-hidden="true" />
                            <span className="ms-capability-icon"><Icon aria-hidden="true" /></span>
                            <ArrowUpRight className="ms-capability-arrow" aria-hidden="true" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
