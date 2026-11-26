import { useLocation } from "react-router-dom";
import { useLocale } from "../../i18n/useLocale.ts";
import { site } from "../../content/site.ts";
import { ButtonLink } from "../ui/ButtonLink.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import { RIDGES } from "../mountains.ts";
import "./Footer.css";

/** The summit: one closing statement, then the ways to reach us. */
export function Footer() {
    const { t } = useLocale();
    const onContactPage = useLocation().pathname === "/contact";

    return (
        <footer className="footer">
            {!onContactPage && (
                <section className="footer__summit">
                    {/* The same range as the hero, seen again from base camp. */}
                    <svg
                        className="footer__range"
                        viewBox="0 380 1440 520"
                        preserveAspectRatio="xMidYMax slice"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient id="footer-range" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" className="footer__stop-top" />
                                <stop offset="1" className="footer__stop-base" />
                            </linearGradient>
                        </defs>
                        <path d={RIDGES.far} fill="url(#footer-range)" opacity="0.6" />
                        <path d={RIDGES.main} fill="url(#footer-range)" />
                    </svg>
                    <p className="eyebrow">{t("footer.eyebrow")}</p>
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
