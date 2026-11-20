import type { Project } from "./types.ts";
import home from "../../assets/projects/maystack/home-current.webp";
import services from "../../assets/projects/maystack/services-current.webp";
import contact from "../../assets/projects/maystack/contact-current.webp";
import mobileHome from "../../assets/projects/maystack/mobile-home-current.webp";
import mobileServices from "../../assets/projects/maystack/mobile-services-current.webp";
import mobileContact from "../../assets/projects/maystack/mobile-contact-current.webp";

export const maystack: Project = {
    slug: "maystack",
    title: { en: "Maystack Website", ar: "موقع مايستاك" },
    category: { en: "Agency website", ar: "موقع وكالة" },
    kind: "website",
    intro: {
        en: "Our own studio site: services, work and enquiries in one bilingual experience.",
        ar: "موقع الاستوديو: الخدمات والأعمال وطلبات المشاريع في تجربة واحدة ثنائية اللغة.",
    },
    challenge: {
        en: "The studio needed one credible place to explain its services, prove the quality of its work, and turn interested visitors into project enquiries.",
        ar: "احتاج الاستوديو إلى مكان موثوق يشرح خدماته ويعرض جودة أعماله ويحول الزوار المهتمين إلى طلبات مشاريع.",
    },
    approach: {
        en: "We designed and developed a bilingual, responsive agency website with clear service paths, detailed case studies, smooth interactions, and direct contact options.",
        ar: "صممنا وطورنا موقع وكالة ثنائي اللغة ومتجاوباً مع مسارات واضحة للخدمات ودراسات حالة مفصلة وتفاعلات سلسة وخيارات تواصل مباشرة.",
    },
    outcome: {
        en: "The finished site gives Maystack a clearer sales story, stronger proof of capability, and a faster route from first visit to project conversation.",
        ar: "يمنح الموقع مايستاك قصة بيع أوضح وإثباتاً أقوى للقدرات ومساراً أسرع من الزيارة الأولى إلى مناقشة المشروع.",
    },
    highlights: [
        { en: "Bilingual responsive experience", ar: "تجربة متجاوبة ثنائية اللغة" },
        { en: "Scroll-driven storytelling", ar: "سرد تفاعلي مع التمرير" },
        { en: "Portfolio and case study flow", ar: "مسار أعمال ودراسات حالة" },
    ],
    stack: ["React", "TypeScript", "Vite", "GSAP", "Lenis", "i18next"],
    liveUrl: "/",
    desktop: [home, services, contact],
    mobile: [mobileHome, mobileServices, mobileContact],
};
