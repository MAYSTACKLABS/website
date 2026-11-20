import type { Project } from "./types.ts";
import cover from "../../assets/projects/core/cover.webp";
import one from "../../assets/projects/core/1.webp";
import two from "../../assets/projects/core/2.webp";
import three from "../../assets/projects/core/3.webp";
import mobileOne from "../../assets/projects/core/mobile1.webp";
import mobileTwo from "../../assets/projects/core/mobile2.webp";
import mobileThree from "../../assets/projects/core/mobile3.webp";

export const core: Project = {
    slug: "core",
    title: { en: "Core Istanbul", ar: "كور إسطنبول" },
    category: { en: "Brand website", ar: "موقع هوية" },
    kind: "website",
    intro: {
        en: "A sleek website for a brand that needs to feel polished and memorable.",
        ar: "تجربة موقع أنيقة لعلامة تحتاج أن تظهر بشكل مصقول ولا ينسى.",
    },
    challenge: {
        en: "Core Istanbul needed a digital presence that could communicate the character of the brand while still making its offer easy to understand.",
        ar: "احتاجت كور إسطنبول إلى حضور رقمي يعبر عن شخصية العلامة مع إبقاء عرضها واضحاً وسهل الفهم.",
    },
    approach: {
        en: "We designed and developed an image-led website with strong visual pacing, practical content sections, and a responsive experience for every screen size.",
        ar: "صممنا وطورنا موقعاً يعتمد على الصور بإيقاع بصري قوي وأقسام محتوى عملية وتجربة متجاوبة مع جميع أحجام الشاشات.",
    },
    outcome: {
        en: "The website gives the brand a more distinctive first impression and makes its story easier to explore on both desktop and mobile.",
        ar: "يمنح الموقع العلامة انطباعاً أول أكثر تميزاً ويجعل استكشاف قصتها أسهل على الكمبيوتر والموبايل.",
    },
    highlights: [
        { en: "Premium landing experience", ar: "تجربة صفحة رئيسية فاخرة" },
        { en: "Image-led storytelling", ar: "سرد بصري بالصور" },
        { en: "Fast, polished interface", ar: "واجهة سريعة ومصقولة" },
    ],
    stack: ["React", "TypeScript", "Responsive Web Design", "Motion Design"],
    liveUrl: "https://www.corebhub.com",
    desktop: [one, two, three, cover],
    mobile: [mobileOne, mobileTwo, mobileThree],
};
