import snowballCover from "../../assets/projects/snowball/cover.png";
import snowballOne from "../../assets/projects/snowball/1.png";
import snowballTwo from "../../assets/projects/snowball/2.png";
import snowballThree from "../../assets/projects/snowball/3.png";
import snowballMobileOne from "../../assets/projects/snowball/mobile1.png";
import snowballMobileTwo from "../../assets/projects/snowball/mobile2.png";
import snowballMobileThree from "../../assets/projects/snowball/mobile3.png";

import growthlineCover from "../../assets/projects/growthline/cover.png";
import growthlineOne from "../../assets/projects/growthline/1.png";
import growthlineTwo from "../../assets/projects/growthline/2.png";
import growthlineThree from "../../assets/projects/growthline/3.png";
import growthlineMobileOne from "../../assets/projects/growthline/mobile1.png";
import growthlineMobileTwo from "../../assets/projects/growthline/mobile2.png";
import growthlineMobileThree from "../../assets/projects/growthline/mobile3.png";

import coreCover from "../../assets/projects/core/cover.png";
import coreOne from "../../assets/projects/core/1.png";
import coreTwo from "../../assets/projects/core/2.png";
import coreThree from "../../assets/projects/core/3.png";
import coreMobileOne from "../../assets/projects/core/mobile1.png";
import coreMobileTwo from "../../assets/projects/core/mobile2.png";
import coreMobileThree from "../../assets/projects/core/mobile3.png";

import hopeTeamCover from "../../assets/projects/hopeteam/cover.png";
import hopeTeamOne from "../../assets/projects/hopeteam/1.png";
import hopeTeamTwo from "../../assets/projects/hopeteam/2.png";
import hopeTeamThree from "../../assets/projects/hopeteam/3.png";
import hopeTeamMobileOne from "../../assets/projects/hopeteam/mobile1.png";
import hopeTeamMobileTwo from "../../assets/projects/hopeteam/mobile2.png";
import hopeTeamMobileThree from "../../assets/projects/hopeteam/mobile3.png";

import maystackCover from "../../assets/projects/maystack/cover.png";
import maystackOne from "../../assets/projects/maystack/1.png";
import maystackTwo from "../../assets/projects/maystack/2.png";
import maystackThree from "../../assets/projects/maystack/3.png";
import maystackMobileOne from "../../assets/projects/maystack/mobile1.png";
import maystackMobileTwo from "../../assets/projects/maystack/mobile2.png";
import maystackMobileThree from "../../assets/projects/maystack/mobile3.png";

type Localized = {
    en: string;
    ar: string;
};

export type ProjectKind = "website" | "platform";

export type Project = {
    slug: string;
    title: Localized;
    category: Localized;
    kinds: ProjectKind[];
    intro: Localized;
    details: Localized;
    accent: string;
    cover: string;
    desktopImages: string[];
    mobileImages: string[];
    highlights: Localized[];
};

export const projects: Project[] = [
    {
        slug: "maystack",
        title: { en: "Maystack Website", ar: "موقع مايستاك" },
        category: { en: "Agency website", ar: "موقع وكالة" },
        kinds: ["website"],
        intro: {
            en: "A polished digital agency website built to present services, portfolio work, and conversion paths with a premium dark interface.",
            ar: "موقع وكالة رقمية مصقول يعرض الخدمات والأعمال ومسارات التواصل بواجهة داكنة فاخرة.",
        },
        details: {
            en: "Maystack brings the brand, service offer, selected projects, and contact flow into one cohesive experience. The site uses responsive navigation, bilingual content, glassmorphism, and project detail pages to help visitors understand the work quickly and start a project with confidence.",
            ar: "يجمع موقع مايستاك الهوية والخدمات والأعمال المختارة ومسار التواصل في تجربة واحدة متماسكة. يعتمد الموقع على تنقل متجاوب ومحتوى ثنائي اللغة وزجاجية بصرية وصفحات تفاصيل للمشاريع لمساعدة الزائر على فهم العمل بسرعة وبدء مشروع بثقة.",
        },
        accent: "#18dbc9",
        cover: maystackCover,
        desktopImages: [maystackOne, maystackTwo, maystackThree],
        mobileImages: [maystackMobileOne, maystackMobileTwo, maystackMobileThree],
        highlights: [
            { en: "Premium dark agency interface", ar: "واجهة وكالة داكنة وفاخرة" },
            { en: "Bilingual responsive experience", ar: "تجربة متجاوبة ثنائية اللغة" },
            { en: "Portfolio and case study flow", ar: "مسار أعمال ودراسات حالة" },
        ],
    },
    {
        slug: "snowball",
        title: { en: "Snowball Foundation", ar: "سنوبول فاونديشن" },
        category: { en: "Student platform", ar: "منصة طلابية" },
        kinds: ["platform"],
        intro: {
            en: "A focused platform experience for students, tasks, reviews, and program visibility.",
            ar: "منصة مركزة للطلاب والمهام والمراجعات ورؤية البرامج بوضوح.",
        },
        details: {
            en: "Snowball brings student progress, task follow-up, and review flows into one clean interface. The design keeps dense operational data readable while staying friendly on mobile.",
            ar: "يجمع سنوبول تقدم الطلاب ومتابعة المهام ومسارات المراجعة في واجهة واحدة واضحة، مع الحفاظ على سهولة قراءة البيانات على الموبايل.",
        },
        accent: "#20a8d8",
        cover: snowballCover,
        desktopImages: [snowballOne, snowballTwo, snowballThree],
        mobileImages: [snowballMobileOne, snowballMobileTwo, snowballMobileThree],
        highlights: [
            { en: "Responsive dashboard flows", ar: "لوحات متجاوبة" },
            { en: "Clear task and review states", ar: "حالات مهام ومراجعات واضحة" },
            { en: "Mobile-friendly student views", ar: "واجهات طلابية مناسبة للموبايل" },
        ],
    },
    {
        slug: "growthline",
        title: { en: "Growthline", ar: "جروث لاين" },
        category: { en: "Business website", ar: "موقع أعمال" },
        kinds: ["website"],
        intro: {
            en: "A modern marketing website built around clarity, trust, and conversion.",
            ar: "موقع تسويقي حديث مبني حول الوضوح والثقة والتحويل.",
        },
        details: {
            en: "Growthline uses a polished visual system, direct messaging, and responsive sections to help visitors understand the offer quickly and take action.",
            ar: "يعتمد جروث لاين على نظام بصري أنيق ورسائل مباشرة وأقسام متجاوبة تساعد الزائر على فهم الخدمة بسرعة واتخاذ الخطوة التالية.",
        },
        accent: "#6540a8",
        cover: growthlineCover,
        desktopImages: [growthlineOne, growthlineTwo, growthlineThree],
        mobileImages: [growthlineMobileOne, growthlineMobileTwo, growthlineMobileThree],
        highlights: [
            { en: "Conversion-focused pages", ar: "صفحات مهيأة للتحويل" },
            { en: "Sharp responsive layouts", ar: "تخطيطات متجاوبة وواضحة" },
            { en: "Clean brand presentation", ar: "عرض نظيف للهوية" },
        ],
    },
    {
        slug: "core",
        title: { en: "Core Istanbul", ar: "كور إسطنبول" },
        category: { en: "Brand website", ar: "موقع هوية" },
        kinds: ["website"],
        intro: {
            en: "A sleek website experience for a brand that needs to feel polished and memorable.",
            ar: "تجربة موقع أنيقة لعلامة تحتاج أن تظهر بشكل مصقول ولا ينسى.",
        },
        details: {
            en: "Core Istanbul balances large visual moments with practical sections, giving the brand a premium first impression across desktop and mobile screens.",
            ar: "يوازن كور إسطنبول بين اللقطات البصرية الكبيرة والأقسام العملية ليمنح العلامة انطباعاً احترافياً على الديسكتوب والموبايل.",
        },
        accent: "#0cae9d",
        cover: coreCover,
        desktopImages: [coreOne, coreTwo, coreThree],
        mobileImages: [coreMobileOne, coreMobileTwo, coreMobileThree],
        highlights: [
            { en: "Premium landing experience", ar: "تجربة صفحة رئيسية فاخرة" },
            { en: "Image-led storytelling", ar: "سرد بصري بالصور" },
            { en: "Fast, polished interface", ar: "واجهة سريعة ومصقولة" },
        ],
    },
    {
        slug: "hope-team",
        title: { en: "Hope Team", ar: "هوب تيم" },
        category: { en: "Community website", ar: "موقع مجتمعي" },
        kinds: ["website"],
        intro: {
            en: "A warm community website designed to explain the mission and guide people to connect.",
            ar: "موقع مجتمعي دافئ يشرح الرسالة ويوجه الناس للتواصل والمشاركة.",
        },
        details: {
            en: "Hope Team keeps the message human and simple, with easy-to-scan sections, strong imagery, and mobile pages that stay light and approachable.",
            ar: "يحافظ هوب تيم على رسالة إنسانية وبسيطة من خلال أقسام سهلة القراءة وصور قوية وصفحات موبايل خفيفة وقريبة.",
        },
        accent: "#7dad65",
        cover: hopeTeamCover,
        desktopImages: [hopeTeamOne, hopeTeamTwo, hopeTeamThree],
        mobileImages: [hopeTeamMobileOne, hopeTeamMobileTwo, hopeTeamMobileThree],
        highlights: [
            { en: "Mission-first structure", ar: "هيكل يبرز الرسالة أولاً" },
            { en: "Friendly content flow", ar: "تدفق محتوى سهل وقريب" },
            { en: "Responsive community pages", ar: "صفحات مجتمعية متجاوبة" },
        ],
    },
];

export function getProject(slug: string | undefined) {
    return projects.find((project) => project.slug === slug);
}
