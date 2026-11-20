import { Link } from "react-router-dom";
import type { Project } from "../content/projects/index.ts";
import { useLocale } from "../i18n/useLocale.ts";
import { ProductScreen } from "./ui/ProductScreen.tsx";
import "./ProjectCard.css";

/** A project in a grid: its cover screen, name and one line. The whole card is the link. */
export function ProjectCard({ project }: { project: Project }) {
    const { pick } = useLocale();

    return (
        <Link to={`/portfolio/${project.slug}`} className="project-card">
            <ProductScreen
                src={project.desktop[0]}
                alt={pick(project.title)}
                sizes="(max-width: 900px) 92vw, 45vw"
            />
            <p className="eyebrow">{pick(project.category)}</p>
            <h2 className="project-card__title">{pick(project.title)}</h2>
            <p className="muted">{pick(project.intro)}</p>
        </Link>
    );
}
