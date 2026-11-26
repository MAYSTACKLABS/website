import { Navigate, useParams } from "react-router-dom";
import { useLocale } from "../../i18n/useLocale.ts";
import { usePageMeta } from "../../hooks/usePageMeta.ts";
import { getProject, projects } from "../../content/projects/index.ts";
import { PageIntro } from "../../components/ui/PageIntro.tsx";
import { ButtonLink } from "../../components/ui/ButtonLink.tsx";
import { Showcase } from "./Showcase.tsx";
import { Reveal } from "../../motion/Reveal.tsx";
import "./Project.css";

const STORY = ["challenge", "approach", "outcome"] as const;

export default function Project() {
    const { t, pick } = useLocale();
    const project = getProject(useParams().slug);
    usePageMeta(
        project ? `${pick(project.title)} | Maystack` : "Maystack",
        project ? pick(project.intro) : "",
    );
    if (!project) return <Navigate to="/portfolio" replace />;

    const name = pick(project.title);
    const next = projects[(projects.indexOf(project) + 1) % projects.length];

    return (
        <article>
            <PageIntro eyebrow={pick(project.category)} title={name} lead={pick(project.intro)}>
                <div className="project__links">
                    {project.liveUrl && (
                        <ButtonLink to={project.liveUrl}>{t("project.live")}</ButtonLink>
                    )}
                    <ButtonLink to="/portfolio" variant="ghost">
                        {t("project.back")}
                    </ButtonLink>
                </div>
            </PageIntro>

            <Showcase key={project.slug} project={project} name={name} />

            <Reveal as="section" className="project__story container">
                {STORY.map((key, index) => (
                    <div key={key}>
                        <p className="eyebrow">
                            {String(index + 1).padStart(2, "0")} · {t(`project.${key}`)}
                        </p>
                        <p>{pick(project[key])}</p>
                    </div>
                ))}
            </Reveal>

            <nav className="project__next container" aria-label={t("project.next")}>
                <p className="eyebrow">{t("project.next")}</p>
                <ButtonLink
                    to={`/portfolio/${next.slug}`}
                    variant="text"
                    className="display project__next-link"
                >
                    {pick(next.title)}
                </ButtonLink>
            </nav>
        </article>
    );
}
