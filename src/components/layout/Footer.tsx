import { useLocation } from "react-router-dom";
import { useLocale } from "../../i18n/useLocale.ts";
import { site } from "../../content/site.ts";
import { ButtonLink } from "../ui/ButtonLink.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import "./Footer.css";

/** The summit: one closing statement, then the ways to reach us. */
export function Footer() {
    const { t } = useLocale();
    const onContactPage = useLocation().pathname === "/contact";

    return (
        <footer className="footer">
            {!onContactPage && (
                <section className="footer__summit container">
                    <p className="eyebrow">{t("footer.eyebrow")}</p>
                    <SplitHeading className="display footer__title">
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
