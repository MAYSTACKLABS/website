import { type FormEvent, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.tsx";
import mountains from "../../assets/hero/optimized/mountains.webp";
import cloudBank from "../../assets/hero/optimized/cloud-bank.webp";

const email = "contact@mestack.com";
const whatsappNumber = "905019565125";

type Answers = {
    intent: string;
    projectType: string;
    budget: string;
    timeline: string;
    topic: string;
    name: string;
    email: string;
    message: string;
};

const initialAnswers: Answers = {
    intent: "",
    projectType: "",
    budget: "",
    timeline: "",
    topic: "",
    name: "",
    email: "",
    message: "",
};

type ChoiceProps = {
    value: string;
    label: string;
    selected: boolean;
    onSelect: (value: string) => void;
};

function Choice({ value, label, selected, onSelect }: ChoiceProps) {
    return (
        <button
            type="button"
            className={selected ? "contact-choice is-selected" : "contact-choice"}
            onClick={() => onSelect(value)}
        >
            <span>{label}</span>
            <span className="contact-choice-mark">{selected ? <Check aria-hidden="true" /> : null}</span>
        </button>
    );
}

export default function Contact() {
    const { lang } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>(initialAnswers);
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const isProject = answers.intent === "project";
    const lastStep = isProject ? 4 : 2;
    const progress = answers.intent ? ((step + 1) / (lastStep + 1)) * 100 : 20;

    const copy = useMemo(() => ({
        intro: lang === "ar" ? "أجب عن أسئلة قصيرة وسنجهز الخطوة التالية." : "Answer a few quick questions and we’ll prepare the right next step.",
        back: lang === "ar" ? "السابق" : "Back",
        continue: lang === "ar" ? "التالي" : "Continue",
    }), [lang]);

    const update = (key: keyof Answers, value: string) => {
        setAnswers((current) => ({ ...current, [key]: value }));
    };

    const resetBranch = (intent: string) => {
        setAnswers({ ...initialAnswers, intent });
        setStep(1);
    };

    const canContinue = () => {
        if (step === 0) return Boolean(answers.intent);
        if (!isProject) return step === 1 ? Boolean(answers.topic) : true;
        if (step === 1) return Boolean(answers.projectType);
        if (step === 2) return Boolean(answers.budget);
        if (step === 3) return Boolean(answers.timeline);
        return true;
    };

    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormStatus("sending");
        const data = new FormData();
        Object.entries(answers).forEach(([key, value]) => data.set(key, value));
        data.set("_subject", `${isProject ? "Project enquiry" : "Website question"} from ${answers.name}`);
        data.set("_template", "table");
        data.set("_captcha", "false");

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: data,
            });
            if (!response.ok) throw new Error("Unable to send form");
            setFormStatus("success");
        } catch {
            setFormStatus("error");
        }
    };

    const renderChoices = (key: keyof Answers, options: Array<{ value: string; label: string }>) => (
        <div className="contact-choice-list">
            {options.map((option) => (
                <Choice
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    selected={answers[key] === option.value}
                    onSelect={(value) => update(key, value)}
                />
            ))}
        </div>
    );

    const renderStep = () => {
        if (step === 0) {
            return (
                <>
                    <p className="contact-step-label">01</p>
                    <h2>{lang === "ar" ? "كيف يمكننا مساعدتك؟" : "What brings you here?"}</h2>
                    <div className="contact-choice-list">
                        <Choice value="project" label={lang === "ar" ? "لدي مشروع" : "I have a project"} selected={answers.intent === "project"} onSelect={resetBranch} />
                        <Choice value="question" label={lang === "ar" ? "لدي سؤال أو فكرة" : "I have a question or idea"} selected={answers.intent === "question"} onSelect={resetBranch} />
                    </div>
                </>
            );
        }

        if (!isProject && step === 1) {
            return (
                <>
                    <p className="contact-step-label">02</p>
                    <h2>{lang === "ar" ? "ما موضوع رسالتك؟" : "What would you like to discuss?"}</h2>
                    {renderChoices("topic", [
                        { value: "collaboration", label: lang === "ar" ? "تعاون أو شراكة" : "Collaboration or partnership" },
                        { value: "existing-product", label: lang === "ar" ? "مراجعة منتج قائم" : "Review an existing product" },
                        { value: "general", label: lang === "ar" ? "سؤال عام" : "General question" },
                    ])}
                </>
            );
        }

        if (isProject && step === 1) {
            return (
                <>
                    <p className="contact-step-label">02</p>
                    <h2>{lang === "ar" ? "ماذا تريد أن نبني؟" : "What should we build?"}</h2>
                    {renderChoices("projectType", [
                        { value: "website", label: lang === "ar" ? "موقع إلكتروني" : "Website" },
                        { value: "platform", label: lang === "ar" ? "منصة أعمال" : "Business platform" },
                        { value: "mobile", label: lang === "ar" ? "تطبيق موبايل" : "Mobile app" },
                        { value: "design", label: lang === "ar" ? "تصميم وتجربة مستخدم" : "Product design and UX" },
                    ])}
                </>
            );
        }

        if (isProject && step === 2) {
            return (
                <>
                    <p className="contact-step-label">03</p>
                    <h2>{lang === "ar" ? "ما نطاق الاستثمار المناسب؟" : "What investment range feels right?"}</h2>
                    {renderChoices("budget", [
                        { value: "under-2k", label: lang === "ar" ? "أقل من 2,000 دولار" : "Under $2k" },
                        { value: "2k-5k", label: "$2k – $5k" },
                        { value: "5k-15k", label: "$5k – $15k" },
                        { value: "15k-plus", label: "$15k+" },
                        { value: "unsure", label: lang === "ar" ? "غير متأكد بعد" : "Not sure yet" },
                    ])}
                </>
            );
        }

        if (isProject && step === 3) {
            return (
                <>
                    <p className="contact-step-label">04</p>
                    <h2>{lang === "ar" ? "متى تريد أن تبدأ؟" : "When would you like to start?"}</h2>
                    {renderChoices("timeline", [
                        { value: "asap", label: lang === "ar" ? "في أقرب وقت" : "As soon as possible" },
                        { value: "one-month", label: lang === "ar" ? "خلال شهر" : "Within a month" },
                        { value: "quarter", label: lang === "ar" ? "خلال 3 أشهر" : "Within three months" },
                        { value: "exploring", label: lang === "ar" ? "ما زلت أستكشف" : "I’m still exploring" },
                    ])}
                </>
            );
        }

        return (
            <>
                <p className="contact-step-label">{isProject ? "05" : "03"}</p>
                <h2>{lang === "ar" ? "إلى من نرسل الخطوة التالية؟" : "Where should we send the next step?"}</h2>
                <div className="contact-final-fields">
                    <label>
                        <span>{lang === "ar" ? "الاسم" : "Name"}</span>
                        <input required autoComplete="name" value={answers.name} onChange={(event) => update("name", event.target.value)} />
                    </label>
                    <label>
                        <span>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</span>
                        <input required type="email" autoComplete="email" value={answers.email} onChange={(event) => update("email", event.target.value)} />
                    </label>
                    <label>
                        <span>{lang === "ar" ? "أي تفاصيل إضافية؟ (اختياري)" : "Anything else we should know? (optional)"}</span>
                        <textarea rows={4} value={answers.message} onChange={(event) => update("message", event.target.value)} />
                    </label>
                </div>
            </>
        );
    };

    if (formStatus === "success") {
        return (
            <main className="contact-experience contact-success-view">
                <div className="contact-success-panel">
                    <span><Check aria-hidden="true" /></span>
                    <h1>{lang === "ar" ? "وصلت رسالتك." : "Your message is on its way."}</h1>
                    <p>{lang === "ar" ? "سنراجع التفاصيل ونرسل لك خطوة تالية واضحة قريباً." : "We’ll review the details and reply with a clear next step."}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="contact-experience">
            <div className="contact-sky" aria-hidden="true" />
            <img className="contact-mountains" src={mountains} alt="" />
            <img className="contact-cloud-bank" src={cloudBank} alt="" />

            <div className="contact-layout ms-container">
                <aside className="contact-intro ms-animate">
                    <p className="contact-kicker">{lang === "ar" ? "تواصل معنا" : "Contact Maystack"}</p>
                    <h1>{lang === "ar" ? "لنصنع شيئاً يستحق الإطلاق." : "Let’s build something worth launching."}</h1>
                    <p>{copy.intro}</p>
                    <div className="contact-direct-links">
                        <a href={`mailto:${email}`}><Mail aria-hidden="true" /><span><small>Email</small>{email}</span></a>
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /><span><small>WhatsApp</small>+90 501 956 51 25</span></a>
                    </div>
                </aside>

                <form className="contact-wizard ms-animate" onSubmit={submitForm}>
                    <div className="contact-progress" aria-label={`${Math.round(progress)}% complete`}><span style={{ width: `${progress}%` }} /></div>
                    <div className="contact-step" key={`${answers.intent}-${step}`}>{renderStep()}</div>

                    <div className="contact-actions">
                        {step > 0 ? (
                            <button type="button" className="contact-back" onClick={() => setStep((current) => current - 1)}>
                                <ArrowLeft aria-hidden="true" />{copy.back}
                            </button>
                        ) : <span />}

                        {step < lastStep ? (
                            <button type="button" className="contact-next" disabled={!canContinue()} onClick={() => setStep((current) => current + 1)}>
                                {copy.continue}<ArrowRight aria-hidden="true" />
                            </button>
                        ) : (
                            <button type="submit" className="contact-next" disabled={!answers.name || !answers.email || formStatus === "sending"}>
                                {formStatus === "sending" ? (lang === "ar" ? "جارٍ الإرسال" : "Sending") : (lang === "ar" ? "أرسل الطلب" : "Send enquiry")}
                                <Send aria-hidden="true" />
                            </button>
                        )}
                    </div>

                    {formStatus === "error" ? <p className="contact-error" role="alert">{lang === "ar" ? "تعذر الإرسال. استخدم البريد أو واتساب." : "Sending failed. Please use email or WhatsApp."}</p> : null}
                </form>
            </div>
        </main>
    );
}

