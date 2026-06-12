import { type FormEvent, useState } from "react";
import { Check, ChevronDown, Mail, MapPin, MessageCircle, MessageSquare, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext.tsx";

const email = "mtmaleisawy@gmail.com";
const whatsappNumber = "905019565125";
const projectTypes = ["Website", "Mobile app", "Business platform", "UI/UX design", "Other"];
const budgetRanges = ["Under $2k", "$2k - $5k", "$5k - $15k", "$15k+", "Not sure yet"];

type SelectMenuProps = {
    label: string;
    placeholder: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
};

function SelectMenu({ label, placeholder, options, value, onChange }: SelectMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <label className="contact-select-field grid gap-2 text-sm font-bold" style={{ color: "var(--ms-text)" }}>
            {label}
            <span className={`contact-select${isOpen ? " is-open" : ""}`}>
                <button
                    type="button"
                    className="contact-select-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((current) => !current)}
                >
                    <span className={value ? "" : "is-placeholder"}>{value || placeholder}</span>
                    <ChevronDown className="h-4 w-4" />
                </button>
                {isOpen ? (
                    <span className="contact-select-menu" role="listbox" aria-label={label}>
                        {options.map((option) => (
                            <button
                                type="button"
                                role="option"
                                aria-selected={option === value}
                                className={option === value ? "is-selected" : ""}
                                key={option}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                            >
                                <span>{option}</span>
                                {option === value ? <Check className="h-4 w-4" /> : null}
                            </button>
                        ))}
                    </span>
                ) : null}
            </span>
        </label>
    );
}

const Contact = () => {
    const { t } = useTranslation();
    const { lang } = useLanguage();
    const [projectType, setProjectType] = useState("");
    const [budget, setBudget] = useState("");
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error" | "incomplete">("idle");

    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!projectType || !budget) {
            setFormStatus("incomplete");
            return;
        }

        setFormStatus("sending");
        const data = new FormData(form);
        data.set("project_type", projectType);
        data.set("budget_range", budget);
        data.set("_subject", `New ${projectType} project enquiry from ${data.get("name")}`);
        data.set("_template", "table");
        data.set("_captcha", "false");

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: data,
            });

            if (!response.ok) throw new Error("Unable to send form");
            form.reset();
            setProjectType("");
            setBudget("");
            setFormStatus("success");
        } catch {
            setFormStatus("error");
        }
    };

    return (
        <div className="ms-page">
            <section className="ms-animate px-5 pb-16 pt-24 text-center md:pb-20 md:pt-28">
                <div className="ms-container">
                    <h1 className="text-5xl font-bold md:text-6xl" style={{ color: "var(--ms-text)" }}>
                        {t("contactPage.titlePrefix")} <span className="text-[#18dbc9]">{t("contactPage.titleAccent")}</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>
                        {lang === "ar"
                            ? "أخبرنا بما تريد بناءه وسنرد عليك بخطوة تالية واضحة."
                            : "Tell us what you want to build. We will reply with a clear next step for your website, app, or business platform."}
                    </p>
                </div>
            </section>

            <section className="px-5 pb-24">
                <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.72fr_1.5fr]">
                    <aside className="ms-card flex h-full flex-col p-8">
                        <h2 className="text-2xl font-bold" style={{ color: "var(--ms-text)" }}>{t("contactPage.infoTitle")}</h2>
                        <p className="mt-3 leading-relaxed" style={{ color: "var(--ms-muted-text)" }}>{t("contactPage.asideIntro")}</p>
                        <div className="mt-7 grid gap-5">
                            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="flex gap-4">
                                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#18dbc9]/16 text-[#18dbc9]"><MessageCircle /></span>
                                <span><strong className="block text-lg" style={{ color: "var(--ms-text)" }}>WhatsApp</strong><span style={{ color: "var(--ms-muted-text)" }}>+90 501 956 51 25</span></span>
                            </a>
                            <a href={`mailto:${email}`} className="flex gap-4">
                                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#18dbc9]/16 text-[#18dbc9]"><Mail /></span>
                                <span><strong className="block text-lg" style={{ color: "var(--ms-text)" }}>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</strong><span style={{ color: "var(--ms-muted-text)" }}>{email}</span></span>
                            </a>
                            <div className="flex gap-4">
                                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#18dbc9]/16 text-[#18dbc9]"><MapPin /></span>
                                <span><strong className="block text-lg" style={{ color: "var(--ms-text)" }}>{lang === "ar" ? "نطاق الخدمة" : "Service area"}</strong><span style={{ color: "var(--ms-muted-text)" }}>{lang === "ar" ? "إسطنبول، تركيا والعمل عن بعد عالمياً" : "Istanbul, Türkiye and remote worldwide"}</span></span>
                            </div>
                        </div>
                    </aside>

                    <form className="ms-card contact-form-card p-8 md:p-10" onSubmit={submitForm}>
                        <div className="mb-8 flex items-center gap-4">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#18dbc9]/16 text-[#18dbc9]"><MessageSquare /></div>
                            <h2 className="text-3xl font-bold" style={{ color: "var(--ms-text)" }}>{t("contactPage.formTitle")}</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <label className="grid gap-2 text-sm font-bold" style={{ color: "var(--ms-text)" }}>
                                {lang === "ar" ? "الاسم" : "Name"}
                                <input className="ms-input" name="name" required autoComplete="name" />
                            </label>
                            <label className="grid gap-2 text-sm font-bold" style={{ color: "var(--ms-text)" }}>
                                {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                                <input className="ms-input" name="email" type="email" required autoComplete="email" />
                            </label>
                            <SelectMenu
                                label={lang === "ar" ? "نوع المشروع" : "Project type"}
                                placeholder={lang === "ar" ? "اختر نوع المشروع" : "Select project type"}
                                options={projectTypes}
                                value={projectType}
                                onChange={setProjectType}
                            />
                            <SelectMenu
                                label={lang === "ar" ? "نطاق الميزانية" : "Budget range"}
                                placeholder={lang === "ar" ? "اختر الميزانية" : "Select budget range"}
                                options={budgetRanges}
                                value={budget}
                                onChange={setBudget}
                            />
                            <label className="grid gap-2 text-sm font-bold md:col-span-2" style={{ color: "var(--ms-text)" }}>
                                {lang === "ar" ? "الرسالة" : "Message"}
                                <textarea className="ms-textarea min-h-44" name="message" required placeholder={lang === "ar" ? "حدثنا عن المشروع والهدف والموعد المتوقع..." : "Tell us about the project, goal, and ideal timeline..."} />
                            </label>
                        </div>
                        <button type="submit" className="ms-button-primary mt-7" disabled={formStatus === "sending"}>
                            {formStatus === "sending" ? (lang === "ar" ? "جارٍ الإرسال..." : "Sending...") : t("contactPage.send")}
                            <Send className="h-4 w-4" />
                        </button>
                        {formStatus === "success" ? (
                            <p className="contact-form-status is-success" role="status">
                                {lang === "ar" ? "تم إرسال رسالتك. سنرد عليك قريباً." : "Your message was sent. We will get back to you soon."}
                            </p>
                        ) : null}
                        {formStatus === "error" ? (
                            <p className="contact-form-status is-error" role="alert">
                                {lang === "ar" ? "تعذر الإرسال. راسلنا عبر البريد أو واتساب." : "Sending failed. Please use email or WhatsApp instead."}
                            </p>
                        ) : null}
                        {formStatus === "incomplete" ? (
                            <p className="contact-form-status is-error" role="alert">
                                {lang === "ar" ? "اختر نوع المشروع ونطاق الميزانية." : "Please select a project type and budget range."}
                            </p>
                        ) : null}
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;
