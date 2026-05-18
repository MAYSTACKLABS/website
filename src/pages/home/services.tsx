import { Code2, Globe2, Palette, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

type Card = {
    key: string;
    title: string;
    Icon: typeof Code2;
};

const Services = () => {
    const { t } = useTranslation();

    const cards: Card[] = [
        {
            key: "mobile",
            title: t("home.services.mobile"),
            Icon: Smartphone,
        },
        {
            key: "web",
            title: t("home.services.web"),
            Icon: Globe2,
        },
        {
            key: "custom",
            title: t("home.services.custom"),
            Icon: Code2,
        },
        {
            key: "uiux",
            title: t("home.services.uiux"),
            Icon: Palette,
        },
    ];

    return (
        <section className="py-20 md:py-24" id="services">
            <div className="ms-container">
                <div className="ms-animate mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="text-4xl font-bold" style={{ color: "var(--ms-text)" }}>{t("home.servicesSection.title")}</h2>
                    <p className="mt-5 text-lg" style={{ color: "var(--ms-muted-text)" }}>
                        {t("home.servicesSection.subtitle")}
                    </p>
                </div>

                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
                    {cards.map((c) => {
                        const Icon = c.Icon;
                        return (
                            <article
                                key={c.key}
                                className="ms-card group flex min-h-36 items-center gap-5 transition duration-300 hover:-translate-y-1"
                            >
                                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#18dbc9]/16 text-[#18dbc9] transition group-hover:bg-[#18dbc9]/24">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold" style={{ color: "var(--ms-text)" }}>{c.title}</h3>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
