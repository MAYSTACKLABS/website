import type { Localized } from "../i18n/useLocale.ts";

export type Step = { title: Localized; text: Localized };

export const process: Step[] = [
    {
        title: { en: "Discover", ar: "الاكتشاف" },
        text: {
            en: "Your goals, your users, and the right problem to solve.",
            ar: "أهدافك، ومستخدموك، والمشكلة الصحيحة التي نحتاج إلى حلها.",
        },
    },
    {
        title: { en: "Design", ar: "التصميم" },
        text: {
            en: "Clear journeys and thoughtful interfaces, tested before we build.",
            ar: "مسارات واضحة وواجهات مدروسة نختبرها قبل البناء.",
        },
    },
    {
        title: { en: "Build", ar: "البناء" },
        text: {
            en: "Reliable code, responsive experiences, and room to grow.",
            ar: "برمجة موثوقة وتجارب متجاوبة ومساحة للنمو.",
        },
    },
    {
        title: { en: "Launch", ar: "الإطلاق" },
        text: {
            en: "The final checks, a smooth release, and a confident handover.",
            ar: "اختبارات نهائية وإطلاق سلس وتسليم واضح.",
        },
    },
    {
        title: { en: "Scale", ar: "النمو" },
        text: {
            en: "Keep learning, improving, and building on what works.",
            ar: "نواصل التعلم والتحسين والبناء على ما ينجح.",
        },
    },
];
