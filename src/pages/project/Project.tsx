import { Navigate, useParams } from "react-router-dom";
import { useLocale } from "../../i18n/useLocale.ts";
import { usePageMeta } from "../../hooks/usePageMeta.ts";
import { getProject, projects } from "../../content/projects/index.ts";
import { PageIntro } from "../../components/ui/PageIntro.tsx";
import { ButtonLink } from "../../components/ui/ButtonLink.tsx";
import { ProductScreen } from "../../components/ui/ProductScreen.tsx";
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

            <div className="container">
                <ProductScreen src={project.desktop[0]} alt={name} sizes="92vw" eager />
            </div>

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

            <section className="project__facts container">
                <ul className="tags">
                    {project.highlights.map((item) => (
                        <li key={item.en}>{pick(item)}</li>
                    ))}
                </ul>
                <ul className="tags">
                    {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </section>

            <section className="project__gallery container" aria-label={t("project.gallery")}>
                {project.desktop.slice(1).map((src, index) => (
                    <Reveal key={src} stagger={0} effect="unveil">
                        <ProductScreen src={src} alt={`${name} — ${index + 2}`} sizes="92vw" />
                    </Reveal>
                ))}
                <Reveal className="project__phones" effect="focus">
                    {project.mobile.map((src, index) => (
                        <ProductScreen
                            key={src}
                            device="phone"
                            src={src}
                            alt={`${name} — mobile ${index + 1}`}
                        />
                    ))}
                </Reveal>
            </section>

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
