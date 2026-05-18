import { useTranslation } from "react-i18next";
import projectPreview from "../../assets/images/project1.png";
import waving from "../../assets/figures/waving.png";

const portfolio = Array.from({ length: 9 }, (_, index) => ({
    title: index % 3 === 0 ? "Growth Line" : index % 3 === 1 ? "Product Portal" : "Studio System",
    category: index % 2 === 0 ? "Web App" : "Interface",
}));

export default function PortfolioGrid() {
    const { t } = useTranslation();
    const filters = [
        t("portfolio.filters.all"),
        t("portfolio.filters.website"),
        t("portfolio.filters.mobile"),
        t("portfolio.filters.desktop"),
        t("portfolio.filters.branding"),
    ];

    return (
        <section className="ms-section" id="portfolio-grid">
            <div className="ms-container">
                <div className="mb-8 text-center">
                    <p className="ms-eyebrow justify-center" style={{ color: "var(--ms-muted-text)" }}>{t("portfolio.gridEyebrow")}</p>
                    <h2 className="mt-3 text-4xl font-bold" style={{ color: "var(--ms-text)" }}>{t("portfolio.gridTitle")}</h2>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        {filters.map((filter, index) => (
                            <button
                                key={filter}
                                className={index === 0 ? "ms-button-primary min-h-9 px-5 text-xs" : "ms-button-ghost min-h-9 px-5 text-xs"}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {portfolio.map((item, index) => (
                        <article
                            key={`${item.title}-${index}`}
                            className="group overflow-hidden rounded-lg border border-white/10 bg-black/18 shadow-xl"
                            style={{ borderColor: "var(--ms-border)", background: "color-mix(in oklab, var(--ms-surface) 70%, transparent)" }}
                        >
                            <div className="relative aspect-[1.32] overflow-hidden bg-slate-950/70">
                                {index % 4 === 2 ? (
                                    <img src={waving} alt="" className="absolute bottom-0 left-1/2 h-full -translate-x-1/2 object-contain opacity-80" />
                                ) : (
                                    <img src={projectPreview} alt="" className="h-full w-full object-cover object-top opacity-88 transition duration-500 group-hover:scale-105" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-emerald-300/8" />
                            </div>
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="text-sm font-semibold" style={{ color: "var(--ms-text)" }}>{item.title}</span>
                                <span className="text-xs" style={{ color: "var(--ms-muted-text)" }}>{item.category}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
