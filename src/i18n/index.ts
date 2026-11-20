import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";

export type Lang = "en" | "ar";

const STORAGE_KEY = "lang";
const saved = localStorage.getItem(STORAGE_KEY);

/** Keeps <html lang/dir> and storage in step with the active language. */
function applyLanguage(lang: string) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

i18n.on("languageChanged", applyLanguage);

void i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, ar: { translation: ar } },
    lng: saved === "ar" ? "ar" : "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
});

applyLanguage(i18n.language);

export default i18n;
