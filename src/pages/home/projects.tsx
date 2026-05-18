import { ArrowUpRight, Code2, Smartphone, Sparkles } from "lucide-react";
import projectPreview from "../../assets/images/project1.png";
import thinking from "../../assets/figures/thinking.png";

const projects = [
    {
        title: "Growth Line Platform",
        category: "Web App",
        image: projectPreview,
        Icon: Code2,
    },
    {
        title: "Mobile Client Portal",
        category: "App Design",
        image: null,
        Icon: Smartphone,
    },
    {
        title: "Launch Design System",
        category: "Branding",
        image: null,
        Icon: Sparkles,
    },
];

export default function Projects() {
    return (
        <section className="ms-section" id="projects">
            <div className="ms-container">
                <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="ms-eyebrow">Selected work</p>
                        <h2 className="mt-3 text-4xl font-bold text-white">Projects</h2>
                    </div>
                    <p className="max-w-lg text-sm leading-relaxed text-white/62">
                        A quick look at the kind of polished product surfaces MayStack builds: practical, visual, and ready to grow.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    {projects.map(({ title, category, image, Icon }, index) => (
                        <article
                            key={title}
                            className="ms-card group min-h-[310px] p-0"
                        >
                            <div className="relative h-56 overflow-hidden bg-slate-950/45">
                                {image ? (
                                    <img src={image} alt="" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                                ) : (
                                    <div className="grid h-full place-items-center bg-gradient-to-br from-emerald-300/18 via-sky-300/12 to-slate-950/60">
                                        <Icon className="h-16 w-16 text-white/20" />
                                    </div>
                                )}
                                {index === 1 ? (
                                    <img src={thinking} alt="" className="absolute bottom-0 right-2 h-48 object-contain opacity-80" />
                                ) : null}
                            </div>
                            <div className="flex items-center justify-between p-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                                    <p className="mt-1 text-xs text-white/52">{category}</p>
                                </div>
                                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.07] text-white/72">
                                    <ArrowUpRight className="h-4 w-4" />
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
