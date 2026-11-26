import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";

export type Lang = "en" | "ar";

const STORAGE_KEY = "lang";
const saved = localStorage.getItem(STORAGE_KEY);

/** No choice made yet: follow the browser — Arabic if it lists Arabic first among en/ar, else English. */
function browserLanguage(): Lang {
    const first = navigator.languages.find((tag) => /^(ar|en)/i.test(tag)) ?? navigator.language;
    return /^ar/i.test(first) ? "ar" : "en";
}

/** Keeps <html lang/dir> in step with the active language. */
function applyLanguage(lang: string) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

i18n.on("languageChanged", applyLanguage);

/** The visitor picked a language: remember it. Until then the browser decides. */
export function chooseLanguage(lang: Lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    void i18n.changeLanguage(lang);
}

void i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, ar: { translation: ar } },
    lng: saved === "ar" || saved === "en" ? saved : browserLanguage(),
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
});

applyLanguage(i18n.language);

export default i18n;
