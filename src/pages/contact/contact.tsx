import { ChevronDown, Github, Instagram, Linkedin, Mail, MessageSquare, Phone, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

const contactInfo = [
    { key: "email", Icon: Mail },
    { key: "phone", Icon: Phone },
];

const socials = [Instagram, Linkedin, Github];

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="ms-page">
            <section className="ms-animate px-5 pb-16 pt-24 text-center md:pb-20 md:pt-28">
                <div className="ms-container">
                    <h1 className="text-5xl font-bold md:text-6xl" style={{ color: "var(--ms-text)" }}>
                        {t("contactPage.titlePrefix")} <span className="text-[#18dbc9]">{t("contactPage.titleAccent")}</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>
                        {t("contactPage.subtitle")}
                    </p>
                </div>
            </section>

            <section className="px-5 pb-24">
                <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.72fr_1.5fr]">
                    <aside>
                        <div className="ms-card flex h-full flex-col p-8">
                            <div>
                                <h2 className="text-2xl font-bold" style={{ color: "var(--ms-text)" }}>{t("contactPage.infoTitle")}</h2>
                                <p className="mt-3 leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>
                                    {t("contactPage.asideIntro")}
                                </p>
                            </div>

                            <div className="mt-7 grid gap-6">
                                {contactInfo.map(({ key, Icon }) => (
                                    <div key={key} className="flex gap-4">
                                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#18dbc9]/16 text-[#18dbc9]">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold" style={{ color: "var(--ms-text)" }}>{t(`contactPage.info.${key}.title`)}</div>
                                            <div className="mt-1" style={{ color: "var(--ms-muted-text)" }}>{t(`contactPage.info.${key}.value`)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 border-t pt-7" style={{ borderColor: "var(--ms-border)" }}>
                                <h3 className="text-lg font-bold" style={{ color: "var(--ms-text)" }}>{t("contactPage.followTitle")}</h3>
                                <div className="mt-4 flex gap-3">
                                    {socials.map((Icon, index) => (
                                        <span key={index} className="grid h-11 w-11 place-items-center rounded-2xl bg-current/8 transition hover:text-[#18dbc9]" style={{ color: "var(--ms-muted-text)" }}>
                                            <Icon className="h-5 w-5" />
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </aside>

                    <form className="ms-card p-8 md:p-10" onSubmit={(event) => event.preventDefault()}>
                        <div className="mb-8 flex items-center gap-4">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#18dbc9]/16 text-[#18dbc9]">
                                <MessageSquare className="h-6 w-6" />
                            </div>
                            <h2 className="text-3xl font-bold" style={{ color: "var(--ms-text)" }}>{t("contactPage.formTitle")}</h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <label className="grid gap-2 text-sm font-bold" style={{ color: "var(--ms-text)" }}>
                                {t("contactPage.fields.name")}
                                <input className="ms-input" />
                            </label>
                            <label className="grid gap-2 text-sm font-bold" style={{ color: "var(--ms-text)" }}>
                                {t("contactPage.fields.email")}
                                <input className="ms-input" />
                            </label>
                            <label className="grid gap-2 text-sm font-bold" style={{ color: "var(--ms-text)" }}>
                                {t("contactPage.fields.phone")}
                                <input className="ms-input" />
                            </label>
                            <label className="grid gap-2 text-sm font-bold" style={{ color: "var(--ms-text)" }}>
                                {t("contactPage.fields.service")}
                                <span className="ms-select-wrap">
                                    <select className="ms-input ms-select">
                                        <option>{t("contactPage.options.service")}</option>
                                        <option>{t("home.services.web")}</option>
                                        <option>{t("home.services.mobile")}</option>
                                        <option>{t("home.services.uiux")}</option>
                                        <option>{t("home.services.custom")}</option>
                                    </select>
                                    <ChevronDown className="ms-select-icon h-4 w-4" aria-hidden="true" />
                                </span>
                            </label>
                            <label className="grid gap-2 text-sm font-bold md:col-span-2" style={{ color: "var(--ms-text)" }}>
                                {t("contactPage.fields.budget")}
                                <span className="ms-select-wrap">
                                    <select className="ms-input ms-select">
                                        <option>{t("contactPage.options.budget")}</option>
                                        <option>$2k - $5k</option>
                                        <option>$5k - $15k</option>
                                        <option>$15k+</option>
                                    </select>
                                    <ChevronDown className="ms-select-icon h-4 w-4" aria-hidden="true" />
                                </span>
                            </label>
                            <label className="grid gap-2 text-sm font-bold md:col-span-2" style={{ color: "var(--ms-text)" }}>
                                {t("contactPage.fields.details")}
                                <textarea className="ms-textarea min-h-44" />
                            </label>
                        </div>

                        <button type="submit" className="ms-button-primary mt-7">
                            {t("contactPage.send")}
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;
