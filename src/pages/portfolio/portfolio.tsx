import { type CSSProperties, useMemo, useState } from "react";
import { Building2, Filter, GraduationCap, HeartHandshake, LineChart, Star, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const projects = [
    {
        title: "Snowball Foundation Student Platform",
        type: "Platform",
        Icon: GraduationCap,
        accent: "#5abce4",
        tags: ["Student portal", "Dashboards", "Workflows"],
        users: "Students",
        rating: "Live",
        duration: "Education",
    },
    {
        title: "Core Istanbul Website",
        type: "Website",
        Icon: Building2,
        accent: "#18dbc9",
        tags: ["Brand site", "Responsive UI", "SEO"],
        users: "Visitors",
        rating: "Live",
        duration: "Istanbul",
    },
    {
        title: "Growthline Website",
        type: "Website",
        Icon: LineChart,
        accent: "#7dad65",
        tags: ["Landing pages", "Analytics", "Lead flow"],
        users: "Teams",
        rating: "Live",
        duration: "Growth",
    },
    {
        title: "Hope Team Website",
        type: "Website",
        Icon: HeartHandshake,
        accent: "#b6e86f",
        tags: ["Community", "Content", "Donation-ready"],
        users: "Community",
        rating: "Ready",
        duration: "Nonprofit",
    },
];

const Portfolio = () => {
    const { t } = useTranslation();
    const filterOptions = ["All Projects", "Website", "Platform"];
    const [activeFilter, setActiveFilter] = useState(filterOptions[0]);
    const visibleProjects = useMemo(
        () => activeFilter === "All Projects" ? projects : projects.filter((project) => project.type === activeFilter),
        [activeFilter],
    );

    return (
        <div className="ms-page portfolio-page" id="work">
            <section className="portfolio-hero ms-animate px-5 pb-16 pt-24 text-center md:pb-20 md:pt-28">
                <div className="ms-container">
                    <h1 className="text-5xl font-bold md:text-6xl" style={{ color: "var(--ms-text)" }}>
                        {t("portfolio.titlePrefix")} <span className="text-[#18dbc9]">{t("portfolio.titleAccent")}</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>
                        {t("portfolio.subtitle")}
                    </p>

                    <div className="ms-glass-panel mx-auto mt-12 inline-flex max-w-full flex-wrap items-center justify-center gap-2 p-2">
                        <Filter className="h-5 w-5 text-current/60" />
                        {filterOptions.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setActiveFilter(filter)}
                                className={activeFilter === filter ? "ms-filter is-selected" : "ms-filter"}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-5 pb-20">
                <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-2">
                    {visibleProjects.map(({ title, type, Icon, accent, tags, users, rating, duration }) => (
                        <article key={title} className="portfolio-card ms-card p-0 transition duration-300 hover:-translate-y-1">
                            <div className="portfolio-card-visual" style={{ "--project-accent": accent } as CSSProperties}>
                                <div className="portfolio-mini-laptop">
                                    <div className="portfolio-mini-screen">
                                        <div className="portfolio-mini-nav">
                                            <span />
                                            <span />
                                            <span />
                                        </div>
                                        <div className="portfolio-mini-content">
                                            <Icon className="h-8 w-8" />
                                            <strong>{title}</strong>
                                            <div className="portfolio-mini-lines">
                                                <span />
                                                <span />
                                                <span />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="portfolio-mini-base" />
                                </div>
                            </div>
                            <div className="p-7">
                                <span className="inline-flex rounded-full bg-[#18dbc9] px-4 py-1 text-sm font-bold text-slate-950">{type}</span>
                                <h2 className="mt-5 text-2xl font-bold" style={{ color: "var(--ms-text)" }}>{title}</h2>
                                <p className="mt-3 min-h-14 leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>
                                    A polished digital experience shaped for the project goals, with responsive screens and a clean production-ready frontend.
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span key={tag} className="rounded bg-current/8 px-3 py-1 text-sm" style={{ color: "var(--ms-muted-text)" }}>{tag}</span>
                                    ))}
                                </div>
                                <div className="mt-6 flex items-center justify-between border-t pt-5 text-sm" style={{ borderColor: "var(--ms-border)", color: "var(--ms-muted-text)" }}>
                                    <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" />{users}</span>
                                    <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-[#18dbc9] text-[#18dbc9]" />{rating}</span>
                                    <span>{duration}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
