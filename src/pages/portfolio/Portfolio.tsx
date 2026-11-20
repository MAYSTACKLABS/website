import { useState } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { usePageMeta } from "../../hooks/usePageMeta.ts";
import { projects, type Project } from "../../content/projects/index.ts";
import { PageIntro } from "../../components/ui/PageIntro.tsx";
import { ProjectCard } from "../../components/ProjectCard.tsx";
import { Reveal } from "../../motion/Reveal.tsx";
import "./Portfolio.css";

type Filter = "all" | Project["kind"];
const FILTERS: Filter[] = ["all", "website", "platform"];

export default function Portfolio() {
    const { t } = useLocale();
    const [filter, setFilter] = useState<Filter>("all");
    usePageMeta(t("portfolio.meta.title"), t("portfolio.meta.description"));

    const visible = projects.filter((project) => filter === "all" || project.kind === filter);

    return (
        <>
            <PageIntro
                eyebrow={t("portfolio.eyebrow")}
                title={t("portfolio.title")}
                lead={t("portfolio.lead")}
            >
                <div className="filters" role="group" aria-label={t("portfolio.filterLabel")}>
                    {FILTERS.map((key) => (
                        <button
                            key={key}
                            type="button"
                            aria-pressed={filter === key}
                            onClick={() => setFilter(key)}
                        >
                            {t(`portfolio.filters.${key}`)}
                        </button>
                    ))}
                </div>
            </PageIntro>

            <Reveal key={filter} className="portfolio-grid container">
                {visible.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </Reveal>
        </>
    );
}
