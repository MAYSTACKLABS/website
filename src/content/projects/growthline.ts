import type { Project } from "./types.ts";
import fullDesktop from "../../assets/projects/growthline/full-desktop.webp";
import fullMobile from "../../assets/projects/growthline/full-mobile.webp";
import one from "../../assets/projects/growthline/1.webp";
import two from "../../assets/projects/growthline/2.webp";
import three from "../../assets/projects/growthline/3.webp";
import mobileOne from "../../assets/projects/growthline/mobile1.webp";
import mobileTwo from "../../assets/projects/growthline/mobile2.webp";
import mobileThree from "../../assets/projects/growthline/mobile3.webp";

export const growthline: Project = {
    slug: "growthline",
    title: { en: "Growthline", ar: "جروث لاين" },
    category: { en: "Business website", ar: "موقع أعمال" },
    kind: "website",
    intro: {
        en: "A modern marketing website built around clarity, trust, and conversion.",
        ar: "موقع تسويقي حديث مبني حول الوضوح والثقة والتحويل.",
    },
    challenge: {
        en: "Growthline needed to present its business offer quickly and professionally without making visitors work through vague or crowded content.",
        ar: "احتاجت جروث لاين إلى عرض خدماتها بسرعة واحترافية دون إجبار الزوار على قراءة محتوى غامض أو مزدحم.",
    },
    approach: {
        en: "We built a responsive marketing website with direct messaging, clear content hierarchy, polished brand visuals, and visible conversion points.",
        ar: "بنينا موقعاً تسويقياً متجاوباً برسائل مباشرة وتسلسل واضح للمحتوى وهوية بصرية مصقولة ونقاط تحويل ظاهرة.",
    },
    outcome: {
        en: "The new experience explains the offer faster, presents the company more consistently, and gives visitors a clearer next step.",
        ar: "تشرح التجربة الجديدة العرض بصورة أسرع وتقدم الشركة بشكل أكثر اتساقاً وتمنح الزائر خطوة تالية أوضح.",
    },
    highlights: [
        { en: "Conversion-focused pages", ar: "صفحات مهيأة للتحويل" },
        { en: "Sharp responsive layouts", ar: "تخطيطات متجاوبة وواضحة" },
        { en: "Clean brand presentation", ar: "عرض نظيف للهوية" },
    ],
    stack: ["React", "TypeScript", "Responsive Web Design", "SEO-ready Structure"],
    desktop: [one, two, three],
    mobile: [mobileOne, mobileTwo, mobileThree],
    liveUrl: "https://www.gl-bd.com/",
    fullDesktop,
    fullMobile,
};
