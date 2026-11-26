import { useLocale } from "../../i18n/useLocale.ts";
import { usePageMeta } from "../../hooks/usePageMeta.ts";
import { Hero } from "./Hero.tsx";
import { ServicesScene } from "./ServicesScene.tsx";
import { WorkScene } from "./WorkScene.tsx";
import { ProcessScene } from "./ProcessScene.tsx";
import "./Home.css";

/** The Ascent: hero, services, work and process, one focus at a time. The footer is the summit. */
export default function Home() {
    const { t } = useLocale();
    usePageMeta(t("home.meta.title"), t("home.meta.description"));

    return (
        <>
            <Hero />
            {/* Everything after the hero sits on one solid sheet with rounded corners,
                which rises over the foot of the hero scene. */}
            <div className="home-sheet">
                <ServicesScene />
                <WorkScene />
                <ProcessScene />
            </div>
        </>
    );
}
