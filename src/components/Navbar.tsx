import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useTheme } from "../context/ThemeContext.tsx";
import { navigation } from "../data/navigation.ts";
import QuickContact from "./shared/QuickContact.tsx";
import logo from "../assets/logos/white.png";

export default function Navbar() {
    const { t } = useTranslation();
    const { lang, setLang } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLButtonElement>(null);
    const shellRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") { setOpen(false); menuRef.current?.focus(); }
        };
        document.addEventListener("keydown", onKey);
        const onOutside = (event: PointerEvent) => {
            if (!shellRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const desktop = window.matchMedia("(min-width: 701px)");
        const onDesktop = () => { if (desktop.matches) setOpen(false); };
        document.addEventListener("pointerdown", onOutside);
        desktop.addEventListener("change", onDesktop);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("pointerdown", onOutside);
            desktop.removeEventListener("change", onDesktop);
        };
    }, [open]);
    const links = (start: number, end: number) => navigation.slice(start, end).map(link =>
        <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => `${isActive ? "is-active" : ""}${link.to === "/contact" ? " nav-project" : ""}`}>{link.to === "/contact" ? <>{lang === "ar" ? "ابدأ مشروعاً" : "Start a project"}<ArrowUpRight aria-hidden="true" /></> : t(link.key)}</NavLink>);
    return <header className="topbar" dir={lang === "ar" ? "rtl" : "ltr"}>
        <nav ref={shellRef} className={`nav-shell${open ? " is-open" : ""}`} aria-label={lang === "ar" ? "التنقل الرئيسي" : "Primary navigation"}>
            <button type="button" className="nav-language nav-endcap" aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"} onClick={() => setLang(lang === "en" ? "ar" : "en")}>{lang === "en" ? "AR" : "EN"}</button>
            <div className="nav-arm nav-arm-start">
            <div className="nav-wing nav-wing-start">{links(0, 2)}<button ref={menuRef} type="button" className="nav-menu" aria-label={lang === "ar" ? "القائمة الرئيسية" : "Toggle navigation"} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div>
            <NavLink to="/" className="nav-center-brand" aria-label="Maystack home" onClick={() => setOpen(false)}><img src={logo} alt="" /><span>MAYSTACK</span></NavLink>
            <div className="nav-arm nav-arm-end"><div className="nav-wing nav-wing-end">{links(2, 4)}<NavLink to="/contact" className="nav-mobile-contact" onClick={() => setOpen(false)}>{lang === "ar" ? "ابدأ" : "Start"}</NavLink></div></div>
            <button type="button" className="nav-theme nav-endcap" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>{theme === "dark" ? <Sun /> : <Moon />}</button>
            <div className="nav-links" id="primary-navigation" inert={!open} dir={lang === "ar" ? "rtl" : "ltr"}><div className="nav-links-inner">{links(0, 4)}</div></div>
        </nav>
        <QuickContact />
    </header>;
}

