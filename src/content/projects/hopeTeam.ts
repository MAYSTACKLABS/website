import type { Project } from "./types.ts";
import one from "../../assets/projects/hopeteam/1.webp";
import two from "../../assets/projects/hopeteam/2.webp";
import three from "../../assets/projects/hopeteam/3.webp";
import mobileOne from "../../assets/projects/hopeteam/mobile1.webp";
import mobileTwo from "../../assets/projects/hopeteam/mobile2.webp";
import mobileThree from "../../assets/projects/hopeteam/mobile3.webp";

export const hopeTeam: Project = {
    slug: "hope-team",
    title: { en: "Hope Team", ar: "هوب تيم" },
    category: { en: "Community website", ar: "موقع مجتمعي" },
    kind: "website",
    intro: {
        en: "A warm community website that explains the mission and guides people to connect.",
        ar: "موقع مجتمعي دافئ يشرح الرسالة ويوجه الناس للتواصل والمشاركة.",
    },
    challenge: {
        en: "Hope Team needed a welcoming website that could explain its mission clearly and help community members understand how to connect.",
        ar: "احتاج فريق هوب إلى موقع مرحب يشرح رسالته بوضوح ويساعد أفراد المجتمع على معرفة كيفية التواصل.",
    },
    approach: {
        en: "We created a warm, mobile-friendly website with mission-first content, strong imagery, readable sections, and clear contact paths.",
        ar: "أنشأنا موقعاً دافئاً ومناسباً للموبايل يبرز الرسالة أولاً ويستخدم صوراً قوية وأقساماً سهلة القراءة ومسارات تواصل واضحة.",
    },
    outcome: {
        en: "The finished site makes the organization easier to understand, gives its mission more visibility, and reduces friction for people who want to engage.",
        ar: "يجعل الموقع المنظمة أسهل في الفهم ويمنح رسالتها ظهوراً أكبر ويقلل العوائق أمام الراغبين في المشاركة.",
    },
    highlights: [
        { en: "Mission-first structure", ar: "هيكل يبرز الرسالة أولاً" },
        { en: "Friendly content flow", ar: "تدفق محتوى سهل وقريب" },
        { en: "Responsive community pages", ar: "صفحات مجتمعية متجاوبة" },
    ],
    stack: ["React", "TypeScript", "Responsive Web Design", "Accessible UI"],
    desktop: [one, two, three],
    mobile: [mobileOne, mobileTwo, mobileThree],
};
