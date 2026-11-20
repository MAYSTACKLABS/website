import { useLocale } from "../../i18n/useLocale.ts";
import { usePageMeta } from "../../hooks/usePageMeta.ts";
import { PageIntro } from "../../components/ui/PageIntro.tsx";
import { ButtonLink } from "../../components/ui/ButtonLink.tsx";

export default function NotFound() {
    const { t } = useLocale();
    usePageMeta(t("notFound.title"), t("notFound.text"));

    return (
        <PageIntro eyebrow="404" title={t("notFound.title")} lead={t("notFound.text")}>
            <ButtonLink to="/">{t("notFound.home")}</ButtonLink>
        </PageIntro>
    );
}
