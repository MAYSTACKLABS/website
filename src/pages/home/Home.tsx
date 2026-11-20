import { useLocale } from "../../i18n/useLocale.ts";
import { usePageMeta } from "../../hooks/usePageMeta.ts";
import { Hero } from "./Hero.tsx";
import { ServicesScene } from "./ServicesScene.tsx";
import { WorkScene } from "./WorkScene.tsx";
import { ProcessScene } from "./ProcessScene.tsx";

/** The Ascent: hero, services, work and process, one focus at a time. The footer is the summit. */
export default function Home() {
    const { t } = useLocale();
    usePageMeta(t("home.meta.title"), t("home.meta.description"));

    return (
        <>
            <Hero />
            <ServicesScene />
            <WorkScene />
            <ProcessScene />
        </>
    );
}
