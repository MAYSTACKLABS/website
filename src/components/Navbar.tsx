import { NavLink } from "react-router-dom";
import { useTheme } from "../utilities/ThemeContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../utilities/LanguageContext";
import logoWhite from "./../assets/logos/white.png";

const NAV = [
    { key: "nav.home", to: "/#home" },
    { key: "nav.services", to: "/services" },
    { key: "nav.work", to: "/work" },
    { key: "nav.why", to: "/why" },
    { key: "nav.contact", to: "/contact" },
];

export default function Navbar() {
    const { theme, toggle } = useTheme();
    const { t } = useTranslation();
    const { lang, toggleLang } = useLanguage();

    const isRTL = lang === "ar";

    return (
        <header className="topbar" dir={isRTL ? "rtl" : "ltr"}>
            <div className="topbar-inner">
                <nav className="nav-ms" aria-label="Primary">
                    {/* Brand */}
                    <NavLink to="/" className="nav-ms-brand" aria-label="Home">
                        <img src={logoWhite} alt="Maystack" className="nav-ms-logo" />
                    </NavLink>

                    {/* Links */}
                    <div className="nav-ms-links">
                        {NAV.map((item) => (
                            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                                {({ isActive  }) => (
                                    <span className={`nav-ms-link ${isActive ? "is-active" : ""}`}>
                    <span className="nav-ms-label">{t(item.key)}</span>
                  </span>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="nav-ms-actions">
                        <button type="button" onClick={toggle} className="nav-ms-btn">
                            {theme === "dark" ? t("theme.light") : t("theme.dark")}
                        </button>

                        <button type="button" onClick={toggleLang} className="nav-ms-btn">
                            {lang === "en" ? t("lang.ar") : t("lang.en")}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
