import { useLocation } from "react-router-dom";
import { useLocale } from "../../i18n/useLocale.ts";
import { site } from "../../content/site.ts";
import { ButtonLink } from "../ui/ButtonLink.tsx";
import { Scenery } from "../Scenery.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import "./Footer.css";

/**
 * Every page ends in the cloud sea: the closing line above it, and the copyright written on
 * the clouds themselves, so the page finishes in cloud rather than a strip of footer.
 */
export function Footer() {
    const { t } = useLocale();
    const onContactPage = useLocation().pathname === "/contact";

    return (
        <footer className="footer">
            {!onContactPage && (
                <div className="footer__content container">
                    <SplitHeading className="display footer__title" effect="blur">
                        {t("footer.title")}
                    </SplitHeading>
                    <div className="footer__actions">
                        <ButtonLink to="/contact">{t("cta.start")}</ButtonLink>
                        <ButtonLink to={`mailto:${site.email}`} variant="ghost">
                            {site.email}
                        </ButtonLink>
                    </div>
                </div>
            )}
            <div className="footer__land">
                <Scenery className="footer__scene" />
                <p className="footer__copy" dir="ltr">© {new Date().getFullYear()} Maystack</p>
            </div>
        </footer>
    );
}
