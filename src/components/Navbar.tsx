import { type CSSProperties, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext.tsx";
import logoWhite from "../assets/logos/whiteFull.png";

const NAV = [
    { key: "nav.home", to: "/" },
    { key: "nav.work", to: "/portfolio" },
    { key: "nav.services", to: "/services" },
    { key: "nav.about", to: "/about" },
    { key: "nav.contact", to: "/contact" },
];

export default function Navbar() {
    const { t } = useTranslation();
    const { lang, setLang } = useLanguage();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const activeIndex = Math.max(
        0,
        NAV.findIndex((item) => item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)),
    );

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname, lang]);

    return (
        <header className="topbar" dir={lang === "ar" ? "rtl" : "ltr"}>
            <div className="topbar-inner">
                <nav className="nav-ms">
                    <NavLink to="/" className="nav-ms-brand" aria-label="Home">
                        <img src={logoWhite} alt="MayStack" className="nav-ms-logo" />
                    </NavLink>

                    <div
                        className="nav-ms-links"
                        dir={lang === "ar" ? "rtl" : "ltr"}
                        style={{ "--nav-active-index": activeIndex } as CSSProperties}
                    >
                        <span className="nav-ms-active-capsule" aria-hidden="true" />
                        {NAV.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => `nav-ms-link ${isActive ? "is-active" : ""}`}
                            >
                                <span className="nav-ms-label">{t(item.key)}</span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="nav-ms-actions">
                        <button
                            type="button"
                            onClick={() => setLang(lang === "en" ? "ar" : "en")}
                            className={`nav-lang-toggle ${lang === "ar" ? "is-ar" : "is-en"}`}
                            aria-label="Change language"
                            dir="ltr"
                        >
                            <span className="nav-lang-thumb" aria-hidden="true" />
                            <span className="nav-lang-option">EN</span>
                            <span className="nav-lang-option">AR</span>
                        </button>
                    </div>

                    <div className="nav-mobile-actions">
                        <button
                            type="button"
                            onClick={() => setLang(lang === "en" ? "ar" : "en")}
                            className={`nav-lang-toggle ${lang === "ar" ? "is-ar" : "is-en"}`}
                            aria-label="Change language"
                            dir="ltr"
                        >
                            <span className="nav-lang-thumb" aria-hidden="true" />
                            <span className="nav-lang-option">EN</span>
                            <span className="nav-lang-option">AR</span>
                        </button>
                        <button
                            type="button"
                            className={isMenuOpen ? "nav-ms-menu-button is-open" : "nav-ms-menu-button"}
                            onClick={() => setIsMenuOpen((value) => !value)}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </nav>

                <div className={isMenuOpen ? "nav-mobile-panel is-open" : "nav-mobile-panel"}>
                    {NAV.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `nav-mobile-link ${isActive ? "is-active" : ""}`}
                        >
                            {t(item.key)}
                        </NavLink>
                    ))}
                </div>
            </div>
        </header>
    );
}
