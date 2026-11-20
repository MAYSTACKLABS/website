// Temporary shim while the remaining pages move to useLocale(). Deleted once they have.
import { useLocale } from "../i18n/useLocale.ts";

export function useLanguage() {
    const { lang, toggleLang } = useLocale();
    return { lang, toggleLang };
}
