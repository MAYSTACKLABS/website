import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MessageCircle, Moon, Sun } from "lucide-react";
import { useLocale } from "../../i18n/useLocale.ts";
import { useTheme } from "../../context/ThemeContext.tsx";
import { navigation, site } from "../../content/site.ts";
import { ScrollTrigger, useGSAP } from "../../motion/gsap.ts";
import { setScrollLocked } from "../../motion/lenis.ts";
import { Logo } from "./Logo.tsx";
import "./Header.css";

/** Slim top bar. Hides while scrolling down, returns on the way up; a full-screen menu on phones. */
export function Header() {
    const { t, lang, toggleLang } = useLocale();
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        document.documentElement.classList.toggle("menu-open", open);
        setScrollLocked(open);
        const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
        addEventListener("keydown", close);
        return () => removeEventListener("keydown", close);
    }, [open]);

    useGSAP(() => {
        ScrollTrigger.create({
            start: 120,
            end: "max",
            onUpdate: (self) => ref.current?.classList.toggle("is-hidden", self.direction === 1),
            onLeaveBack: () => ref.current?.classList.remove("is-hidden"),
        });
    });

    return (
        <header ref={ref} className={`header${open ? " is-open" : ""}`}>
            <div
                className="header__bar container"
                onClick={(event) => (event.target as Element).closest("a") && setOpen(false)}
            >
                <Logo />
                <nav className="header__nav" id="site-menu" aria-label={t("nav.label")}>
                    {navigation.map((link) => (
                        <NavLink key={link.to} to={link.to} className="header__link">
                            {t(link.label)}
                        </NavLink>
                    ))}
                </nav>
                <div className="header__tools">
                    <a
                        className="header__whatsapp"
                        href={`https://wa.me/${site.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <MessageCircle aria-hidden="true" />
                        <span>WhatsApp</span>
                    </a>
                    <button type="button" onClick={toggleLang} aria-label={t("nav.switchLanguage")}>
                        {lang === "en" ? "ع" : "EN"}
                    </button>
                    <button type="button" onClick={toggleTheme} aria-label={t("nav.switchTheme")}>
                        {theme === "dark" ? (
                            <Sun aria-hidden="true" />
                        ) : (
                            <Moon aria-hidden="true" />
                        )}
                    </button>
                    <button
                        type="button"
                        className="header__menu"
                        aria-expanded={open}
                        aria-controls="site-menu"
                        onClick={() => setOpen(!open)}
                    >
                        {t(open ? "nav.close" : "nav.menu")}
                    </button>
                </div>
            </div>
        </header>
    );
}
