import { Link } from "react-router-dom";
import type { Project } from "../content/projects/index.ts";
import { useLocale } from "../i18n/useLocale.ts";
import { DeviceSet } from "./ui/Devices.tsx";
import "./ProjectCard.css";

/** A project in a grid: laptop and phone, name and one line. The whole card is the link. */
export function ProjectCard({ project }: { project: Project }) {
    const { pick } = useLocale();

    return (
        <Link to={`/portfolio/${project.slug}`} className="project-card">
            <DeviceSet
                className="project-card__devices"
                desktop={project.desktop[0]}
                mobile={project.mobile[0]}
                alt={pick(project.title)}
                eager
            />
            <p className="eyebrow">{pick(project.category)}</p>
            <h2 className="project-card__title">{pick(project.title)}</h2>
            <p className="muted">{pick(project.intro)}</p>
        </Link>
    );
}
