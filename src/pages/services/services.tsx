import { Check, Cloud, Code2, Database, Globe2, Palette, ShieldCheck, Smartphone, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const mainServiceDefs = [
    { key: "mobile", Icon: Smartphone, color: "from-[#5abce4] to-[#18dbc9]" },
    { key: "web", Icon: Globe2, color: "from-[#0690a2] to-[#5abce4]" },
    { key: "custom", Icon: Code2, color: "from-[#7dad65] to-[#18dbc9]" },
    { key: "uiux", Icon: Palette, color: "from-[#18dbc9] to-[#7dad65]" },
];

const additionalDefs = [
    { key: "backend", Icon: Database },
    { key: "cloud", Icon: Cloud },
    { key: "security", Icon: ShieldCheck },
    { key: "performance", Icon: Zap },
];

const processKeys = ["discovery", "planning", "design", "development", "testing", "launch"];

const Services = () => {
    const { t } = useTranslation();

    const mainServices = mainServiceDefs.map((service) => ({
        ...service,
        title: t(`servicesPage.main.${service.key}.title`),
        desc: t(`servicesPage.main.${service.key}.desc`),
        items: t(`servicesPage.main.${service.key}.items`, { returnObjects: true }) as string[],
    }));

    const additional = additionalDefs.map((service) => ({
        ...service,
        title: t(`servicesPage.additional.items.${service.key}.title`),
        desc: t(`servicesPage.additional.items.${service.key}.desc`),
    }));

    const process = processKeys.map((key, index) => ({
        number: String(index + 1).padStart(2, "0"),
        title: t(`servicesPage.process.items.${key}.title`),
        desc: t(`servicesPage.process.items.${key}.desc`),
    }));

    return (
        <div className="ms-page">
            <section className="ms-animate px-5 pb-16 pt-24 text-center md:pb-20 md:pt-28">
                <div className="ms-container">
                    <h1 className="text-5xl font-bold md:text-6xl" style={{ color: "var(--ms-text)" }}>
                        {t("servicesPage.titlePrefix")} <span className="text-[#18dbc9]">{t("servicesPage.titleAccent")}</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>
                        {t("servicesPage.subtitle")}
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20">
                <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-2">
                    {mainServices.map(({ title, desc, Icon, color, items }) => (
                        <article key={title} className="ms-card p-8 md:p-10">
                            <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${color}`}>
                                <Icon className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="mt-8 text-2xl font-bold" style={{ color: "var(--ms-text)" }}>{title}</h2>
                            <p className="mt-4 leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>{desc}</p>
                            <ul className="mt-7 grid gap-4">
                                {items.map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--ms-muted-text)" }}>
                                        <Check className="h-5 w-5 text-[#18dbc9]" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>

            <section className="px-5 pb-20">
                <div className="ms-container">
                    <h2 className="mb-10 text-center text-3xl font-bold" style={{ color: "var(--ms-text)" }}>{t("servicesPage.additional.title")}</h2>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {additional.map(({ title, desc, Icon }) => (
                            <article key={title} className="ms-card">
                                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#18dbc9]/16 text-[#18dbc9]">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold" style={{ color: "var(--ms-text)" }}>{title}</h3>
                                <p className="mt-3 leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>{desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-5 pb-24">
                <div className="ms-container">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold" style={{ color: "var(--ms-text)" }}>{t("servicesPage.process.title")}</h2>
                        <p className="mt-4" style={{ color: "var(--ms-muted-text)" }}>{t("servicesPage.process.subtitle")}</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {process.map(({ number, title, desc }) => (
                            <article key={number} className="ms-card">
                                <div className="text-5xl font-bold text-[#18dbc9]">{number}</div>
                                <h3 className="mt-5 text-xl font-bold" style={{ color: "var(--ms-text)" }}>{title}</h3>
                                <p className="mt-3 leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>{desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
