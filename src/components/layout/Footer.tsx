import { useLocation } from "react-router-dom";
import { useLocale } from "../../i18n/useLocale.ts";
import { site } from "../../content/site.ts";
import { ButtonLink } from "../ui/ButtonLink.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import mountains from "../../assets/scene/mountains.webp";
import moon from "../../assets/scene/moon.webp";
import sun from "../../assets/scene/sun.webp";
import clouds from "../../assets/scene/clouds.webp";
import "./Footer.css";

/** The summit: one closing statement in front of the range, then the ways to reach us. */
export function Footer() {
    const { t } = useLocale();
    const onContactPage = useLocation().pathname === "/contact";

    return (
        <footer className="footer">
            {!onContactPage && (
                <section className="footer__summit">
                    {/* The hero scene again, as on the first Maystack site: sun or moon, the range, the cloud bank. */}
                    <div className="footer__scene" aria-hidden="true">
                        <img className="footer__orb footer__sun" src={sun} alt="" loading="lazy" />
                        <img className="footer__orb footer__moon" src={moon} alt="" loading="lazy" />
                        <img className="footer__peak" src={mountains} alt="" loading="lazy" />
                        <img className="clouds footer__clouds" src={clouds} alt="" loading="lazy" />
                    </div>
                    <SplitHeading className="display footer__title" effect="blur">
                        {t("footer.title")}
                    </SplitHeading>
                    <div className="footer__actions">
                        <ButtonLink to="/contact">{t("cta.start")}</ButtonLink>
                        <ButtonLink to={`mailto:${site.email}`} variant="ghost">
                            {site.email}
                        </ButtonLink>
                    </div>
                </section>
            )}
            <div className="footer__bar container">
                <span>© {new Date().getFullYear()} Maystack</span>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                    WhatsApp · <bdi>{site.phoneLabel}</bdi>
                </a>
            </div>
        </footer>
    );
}
