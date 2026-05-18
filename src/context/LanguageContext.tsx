import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Lang = "en" | "ar";

const LANG_CFG: Record<Lang, { dir: "ltr" | "rtl"; htmlLang: string; htmlClass: string }> = {
    en: { dir: "ltr", htmlLang: "en", htmlClass: "lang-en" },
    ar: { dir: "rtl", htmlLang: "ar", htmlClass: "lang-ar" },
};

type LanguageContextValue = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();

    const [lang, setLangState] = useState<Lang>(() => {
        const saved = localStorage.getItem("lang");
        return saved === "ar" ? "ar" : "en";
    });

    const apply = (next: Lang) => {
        setLangState(next);
        localStorage.setItem("lang", next);

        const cfg = LANG_CFG[next];
        document.documentElement.lang = cfg.htmlLang;
        document.documentElement.dir = cfg.dir;

        document.documentElement.classList.remove(LANG_CFG.en.htmlClass, LANG_CFG.ar.htmlClass);
        document.documentElement.classList.add(cfg.htmlClass);

        // ✅ IMPORTANT: updates translations instantly
        if (i18n.language !== next) {
            void i18n.changeLanguage(next);
        }
    };

    useEffect(() => {
        apply(lang);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = useMemo<LanguageContextValue>(
        () => ({
            lang,
            setLang: apply,
            toggleLang: () => apply(lang === "en" ? "ar" : "en"),
        }),
        [lang, i18n.language]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
    return ctx;
}
