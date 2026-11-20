import { core } from "./core.ts";
import { growthline } from "./growthline.ts";
import { snowball } from "./snowball.ts";
import { hopeTeam } from "./hopeTeam.ts";
import { maystack } from "./maystack.ts";

export type { Project } from "./types.ts";

/** Display order everywhere on the site. Our own site goes last. */
export const projects = [core, growthline, snowball, hopeTeam, maystack];

/** Client work only: what the home page features. */
export const clientProjects = projects.filter((project) => project.slug !== "maystack");

export const getProject = (slug?: string) => projects.find((project) => project.slug === slug);
