import { Award, Heart, Lightbulb, Medal, Rocket, Shield, Target, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const stats = [
    { value: "150+", key: "projects", Icon: Target },
    { value: "50+", key: "clients", Icon: Users },
    { value: "5+", key: "years", Icon: Medal },
    { value: "98%", key: "satisfaction", Icon: Lightbulb },
];

const values = [
    { key: "client", Icon: Heart },
    { key: "innovation", Icon: Rocket },
    { key: "quality", Icon: Shield },
    { key: "collaboration", Icon: Users },
];

export default function About() {
    const { t } = useTranslation();
    const story = t("about.story.paragraphs", { returnObjects: true }) as string[];

    return (
        <div className="ms-page">
            <section className="ms-animate px-5 pb-16 pt-24 text-center md:pb-20 md:pt-28">
                <div className="ms-container">
                    <h1 className="text-5xl font-bold md:text-6xl" style={{ color: "var(--ms-text)" }}>
                        {t("about.titlePrefix")} <span className="text-[#18dbc9]">Maystack</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>
                        {t("about.subtitle")}
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20">
                <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
                    <div>
                        <h2 className="text-3xl font-bold" style={{ color: "var(--ms-text)" }}>{t("about.story.title")}</h2>
                        <div className="mt-7 grid gap-5 leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>
                            {story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        </div>
                    </div>
                    <div className="ms-glass-panel grid min-h-[420px] place-items-center">
                        <Award className="h-28 w-28 text-[#18dbc9]" />
                    </div>
                </div>
            </section>

            <section className="px-5 pb-20">
                <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map(({ value, key, Icon }) => (
                        <article key={key} className="ms-card text-center">
                            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#18dbc9]/16 text-[#18dbc9]">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="mt-6 text-4xl font-bold text-[#18dbc9]">{value}</div>
                            <div className="mt-3" style={{ color: "var(--ms-muted-text)" }}>{t(`about.stats.${key}`)}</div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="px-5 pb-24">
                <div className="ms-container">
                    <h2 className="mb-10 text-center text-3xl font-bold" style={{ color: "var(--ms-text)" }}>{t("about.values.title")}</h2>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {values.map(({ key, Icon }) => (
                            <article key={key} className="ms-card">
                                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#18dbc9]/16 text-[#18dbc9]">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold" style={{ color: "var(--ms-text)" }}>{t(`about.values.items.${key}.title`)}</h3>
                                <p className="mt-3 leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>{t(`about.values.items.${key}.desc`)}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
