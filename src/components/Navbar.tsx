import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useTheme } from "../context/ThemeContext.tsx";
import logo from "../assets/logos/white.png";

const links = [
    { key: "nav.home", to: "/" },
    { key: "nav.services", to: "/services" },
    { key: "nav.work", to: "/portfolio" },
    { key: "nav.contact", to: "/contact" },
];

export default function Navbar() {
    const { t } = useTranslation();
    const { lang, setLang } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <header className="topbar" dir={lang === "ar" ? "rtl" : "ltr"}>
            <nav className={`nav-shell${open ? " is-open" : ""}`} aria-label={lang === "ar" ? "التنقل الرئيسي" : "Primary navigation"}>
                <NavLink to="/" className="nav-logo-orb" aria-label="Maystack home" onClick={() => setOpen(false)}>
                    <img src={logo} alt="" />
                </NavLink>
                <NavLink to="/" className="nav-wordmark" onClick={() => setOpen(false)}>MAYSTACK</NavLink>
                <div className="nav-links" id="primary-navigation">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "is-active" : ""}>
                            {t(link.key)}
                        </NavLink>
                    ))}
                </div>
                <div className="nav-actions">
                    <button type="button" className="nav-language" onClick={() => setLang(lang === "en" ? "ar" : "en")}>{lang === "en" ? "AR" : "EN"}</button>
                    <button type="button" className="nav-theme" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
                        {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
                    </button>
                    <NavLink to="/contact" className="nav-cta">{lang === "ar" ? "ابدأ مشروعاً" : "Start a project"}</NavLink>
                    <button type="button" className="nav-menu" aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
                        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                    </button>
                </div>
            </nav>
        </header>
    );
}

