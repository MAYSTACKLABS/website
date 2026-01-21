import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import i18n from "../components/language/i18n";

type Lang = "en" | "ar";
type Ctx = { lang: Lang; toggleLang: () => void; setLang: (l: Lang) => void };

const LanguageContext = createContext<Ctx | null>(null);

function normalizeLang(lng?: string): Lang {
    return lng?.startsWith("ar") ? "ar" : "en";
}

function applyHtmlLangDir(lang: Lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => normalizeLang(i18n.language));

    const setLang = (next: Lang) => {
        const current = normalizeLang(i18n.language);
        if (current === next) return;

        i18n.changeLanguage(next);
        localStorage.setItem("lang", next);
        setLangState(next);
        applyHtmlLangDir(next);
    };

    const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

    // Keep state synced if language changes from anywhere else
    useEffect(() => {
        applyHtmlLangDir(lang);

        const onChange = (lng: string) => {
            const next = normalizeLang(lng);
            setLangState(next);
            localStorage.setItem("lang", next);
            applyHtmlLangDir(next);
        };

        i18n.on("languageChanged", onChange);
        return () => {
            i18n.off("languageChanged", onChange);
        };
    }, [lang]);

    const value = useMemo(() => ({ lang, toggleLang, setLang }), [lang]);

    return <LanguageContext.Provider value={value}> {children} </LanguageContext.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
    return ctx;
}
