import { useEffect, useRef, useState } from "react";
import { ArrowDown, BriefcaseBusiness, Home, Layers3, Mail, Moon, Sun, type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useTheme } from "../context/ThemeContext.tsx";
import logoWhite from "../assets/logos/white.png";

type NavItem = {
    key: string;
    to: string;
    Icon: LucideIcon;
};

const NAV_LEFT: NavItem[] = [
    { key: "nav.home", to: "/", Icon: Home },
    { key: "nav.services", to: "/services", Icon: Layers3 },
];

const NAV_RIGHT: NavItem[] = [
    { key: "nav.work", to: "/portfolio", Icon: BriefcaseBusiness },
    { key: "nav.contact", to: "/contact", Icon: Mail },
];

function NavigationLinks({ items, onNavigate }: { items: NavItem[]; onNavigate: () => void }) {
    const { t } = useTranslation();

    return (
        <div className="nav-ms-links">
            {items.map(({ key, to, Icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    onClick={onNavigate}
                    className={({ isActive }) => `nav-ms-link ${isActive ? "is-active" : ""}`}
                >
                    <Icon aria-hidden="true" />
                    <span className="nav-ms-label">{t(key)}</span>
                </NavLink>
            ))}
        </div>
    );
}

export default function Navbar() {
    const { t } = useTranslation();
    const { lang, setLang } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const navRef = useRef<HTMLElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };
        const closeOnOutsideClick = (event: PointerEvent) => {
            if (!navRef.current?.contains(event.target as Node)) setIsOpen(false);
        };

        document.addEventListener("keydown", closeOnEscape);
        document.addEventListener("pointerdown", closeOnOutsideClick);
        return () => {
            document.removeEventListener("keydown", closeOnEscape);
            document.removeEventListener("pointerdown", closeOnOutsideClick);
        };
    }, [isOpen]);

    return (
        <header className="topbar" dir={lang === "ar" ? "rtl" : "ltr"}>
            <div className="topbar-inner">
                <nav
                    ref={navRef}
                    className={`nav-ms${isOpen ? " is-open" : ""}`}
                    aria-label={lang === "ar" ? "التنقل الرئيسي" : "Primary navigation"}
                    onMouseEnter={() => {
                        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setIsOpen(true);
                    }}
                    onMouseLeave={() => {
                        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setIsOpen(false);
                    }}
                >
                    <div className="nav-ms-core" id="primary-navigation">
                        <div className="nav-ms-wing nav-ms-wing-left">
                            <button
                                type="button"
                                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                                className="nav-ms-language"
                                aria-label={lang === "ar" ? "تغيير اللغة" : "Change language"}
                            >
                                {lang === "en" ? t("lang.ar") : t("lang.en")}
                            </button>
                            <NavigationLinks items={NAV_LEFT} onNavigate={() => setIsOpen(false)} />
                        </div>

                        <NavLink to="/" className="nav-ms-brand" aria-label="Maystack home" onClick={() => setIsOpen(false)}>
                            <img src={logoWhite} alt="" className="nav-ms-logo" />
                            <span>MAYSTACK</span>
                        </NavLink>

                        <div className="nav-ms-wing nav-ms-wing-right">
                            <NavigationLinks items={NAV_RIGHT} onNavigate={() => setIsOpen(false)} />
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="nav-ms-theme"
                                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                <Sun className="theme-icon theme-icon-sun" aria-hidden="true" />
                                <Moon className="theme-icon theme-icon-moon" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen((current) => !current)}
                        className="nav-ms-toggle"
                        aria-controls="primary-navigation"
                        aria-expanded={isOpen}
                        aria-label={isOpen
                            ? (lang === "ar" ? "إغلاق قائمة التنقل" : "Close navigation")
                            : (lang === "ar" ? "فتح قائمة التنقل" : "Open navigation")}
                    >
                        <img className="nav-ms-toggle-logo" src={logoWhite} alt="" />
                        <span>MAYSTACK</span>
                        <ArrowDown aria-hidden="true" />
                    </button>
                </nav>
            </div>
        </header>
    );
}

