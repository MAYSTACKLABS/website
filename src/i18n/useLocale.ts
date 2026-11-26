import { useTranslation } from "react-i18next";
import { chooseLanguage, type Lang } from "./index.ts";

/** Text written in both languages, used by content files in `src/content`. */
export type Localized = Record<Lang, string>;

/** One hook for everything language-related: translate keys, pick content, switch language. */
export function useLocale() {
    const { t, i18n } = useTranslation();
    const lang: Lang = i18n.language === "ar" ? "ar" : "en";

    return {
        t,
        lang,
        isRtl: lang === "ar",
        pick: (text: Localized) => text[lang],
        toggleLang: () => chooseLanguage(lang === "en" ? "ar" : "en"),
    };
}
