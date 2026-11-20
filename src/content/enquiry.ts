import type { Localized } from "../i18n/useLocale.ts";

export type Choice = { value: string; label: Localized };
export type Question = {
    key: "intent" | "projectType" | "budget" | "timeline" | "topic";
    title: Localized;
    choices: Choice[];
};

/** First question: decides which path the visitor takes. */
export const intentQuestion: Question = {
    key: "intent",
    title: { en: "What brings you here?", ar: "كيف يمكننا مساعدتك؟" },
    choices: [
        { value: "project", label: { en: "I have a project", ar: "لدي مشروع" } },
        { value: "question", label: { en: "I have a question or idea", ar: "لدي سؤال أو فكرة" } },
    ],
};

/** Questions per path. Every path ends with the details step (name, email, phone, message). */
export const paths: Record<string, Question[]> = {
    project: [
        {
            key: "projectType",
            title: { en: "What should we build?", ar: "ماذا تريد أن نبني؟" },
            choices: [
                { value: "website", label: { en: "Website", ar: "موقع إلكتروني" } },
                { value: "platform", label: { en: "Business platform", ar: "منصة أعمال" } },
                { value: "mobile", label: { en: "Mobile app", ar: "تطبيق موبايل" } },
                {
                    value: "design",
                    label: { en: "Product design and UX", ar: "تصميم وتجربة مستخدم" },
                },
            ],
        },
        {
            key: "budget",
            title: { en: "What investment range feels right?", ar: "ما نطاق الاستثمار المناسب؟" },
            choices: [
                { value: "under-2k", label: { en: "Under $2k", ar: "أقل من 2,000 دولار" } },
                { value: "2k-5k", label: { en: "$2k – $5k", ar: "$2k – $5k" } },
                { value: "5k-15k", label: { en: "$5k – $15k", ar: "$5k – $15k" } },
                { value: "15k-plus", label: { en: "$15k+", ar: "$15k+" } },
                { value: "unsure", label: { en: "Not sure yet", ar: "غير متأكد بعد" } },
            ],
        },
        {
            key: "timeline",
            title: { en: "When would you like to start?", ar: "متى تريد أن تبدأ؟" },
            choices: [
                { value: "asap", label: { en: "As soon as possible", ar: "في أقرب وقت" } },
                { value: "one-month", label: { en: "Within a month", ar: "خلال شهر" } },
                { value: "quarter", label: { en: "Within three months", ar: "خلال 3 أشهر" } },
                { value: "exploring", label: { en: "I’m still exploring", ar: "ما زلت أستكشف" } },
            ],
        },
    ],
    question: [
        {
            key: "topic",
            title: { en: "What would you like to discuss?", ar: "ما موضوع رسالتك؟" },
            choices: [
                {
                    value: "collaboration",
                    label: { en: "Collaboration or partnership", ar: "تعاون أو شراكة" },
                },
                {
                    value: "existing-product",
                    label: { en: "Review an existing product", ar: "مراجعة منتج قائم" },
                },
                { value: "general", label: { en: "General question", ar: "سؤال عام" } },
            ],
        },
    ],
};
