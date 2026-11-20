import type { Localized } from "../i18n/useLocale.ts";
import { core } from "./projects/core.ts";
import { growthline } from "./projects/growthline.ts";
import { snowball } from "./projects/snowball.ts";
import type { Project } from "./projects/types.ts";

export type Service = {
    id: "design" | "mobile" | "web" | "platforms";
    title: Localized;
    description: Localized;
    deliverables: Localized[];
    /** The project whose screens illustrate this service. */
    showcase: Project;
};

export const services: Service[] = [
    {
        id: "design",
        title: { en: "UI/UX design", ar: "تصميم تجربة المستخدم" },
        description: {
            en: "Make every interaction feel effortless. We turn complex ideas into clear, intuitive digital experiences.",
            ar: "نجعل كل تفاعل بسيطاً، ونحوّل الأفكار المعقدة إلى تجارب رقمية واضحة وسهلة.",
        },
        deliverables: [
            { en: "User journeys", ar: "مسارات المستخدم" },
            { en: "Interface design", ar: "تصميم الواجهات" },
            { en: "Interactive prototypes", ar: "نماذج تفاعلية" },
            { en: "Design systems", ar: "أنظمة التصميم" },
        ],
        showcase: core,
    },
    {
        id: "mobile",
        title: { en: "Mobile applications", ar: "تطبيقات الموبايل" },
        description: {
            en: "Useful in the moments that matter. Thoughtful mobile experiences built around what your users need to do.",
            ar: "تجارب موبايل مدروسة، نطورها حول احتياجات المستخدمين وما يريدون إنجازه.",
        },
        deliverables: [
            { en: "Product strategy", ar: "استراتيجية المنتج" },
            { en: "App interfaces", ar: "واجهات التطبيقات" },
            { en: "Development", ar: "التطوير" },
            { en: "Release support", ar: "دعم الإطلاق" },
        ],
        showcase: snowball,
    },
    {
        id: "web",
        title: { en: "Web development", ar: "تطوير المواقع" },
        description: {
            en: "A website that earns its place in your business. Fast, accessible, and built to work beautifully on every screen.",
            ar: "موقع يدعم أعمالك، سريع وسهل الاستخدام ويعمل بإتقان على جميع الشاشات.",
        },
        deliverables: [
            { en: "Brand websites", ar: "مواقع العلامات التجارية" },
            { en: "Web applications", ar: "تطبيقات الويب" },
            { en: "Responsive development", ar: "تطوير متجاوب" },
            { en: "Performance", ar: "تحسين الأداء" },
        ],
        showcase: growthline,
    },
    {
        id: "platforms",
        title: { en: "Custom platforms", ar: "المنصات المخصصة" },
        description: {
            en: "Bring your workflows together. Dashboards, portals, and business tools designed around the way your team works.",
            ar: "نجمع مسارات عملك في لوحات تحكم وبوابات وأدوات مصممة لطريقة عمل فريقك.",
        },
        deliverables: [
            { en: "Dashboards", ar: "لوحات التحكم" },
            { en: "Business portals", ar: "بوابات الأعمال" },
            { en: "Connected workflows", ar: "مسارات عمل مترابطة" },
            { en: "Ongoing improvement", ar: "تحسين مستمر" },
        ],
        showcase: snowball,
    },
];
