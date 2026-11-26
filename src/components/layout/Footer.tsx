import { useLocation } from "react-router-dom";
import { useLocale } from "../../i18n/useLocale.ts";
import { site } from "../../content/site.ts";
import { ButtonLink } from "../ui/ButtonLink.tsx";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import "./Footer.css";

/** The closing line, the ways to reach us, and the copyright. */
export function Footer() {
    const { t } = useLocale();
    const onContactPage = useLocation().pathname === "/contact";

    return (
        <footer className={`footer${onContactPage ? " footer--plain" : ""}`}>
            {!onContactPage && (
                <SplitHeading className="display footer__title" effect="blur">
                    {t("footer.title")}
                </SplitHeading>
            )}
            <div className="footer__base">
                    {!onContactPage && (
                        <div className="footer__actions">
                            <ButtonLink to="/contact">{t("cta.start")}</ButtonLink>
                            <ButtonLink to={`mailto:${site.email}`} variant="ghost">
                                {site.email}
                            </ButtonLink>
                        </div>
                    )}
                    <p className="footer__copy" dir="ltr">
                        © {new Date().getFullYear()} Maystack
                    </p>
            </div>
        </footer>
    );
}
