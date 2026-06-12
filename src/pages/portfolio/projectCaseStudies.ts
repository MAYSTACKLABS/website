type Localized = { en: string; ar: string };

export type ProjectCaseStudy = {
    problem: Localized;
    solution: Localized;
    result: Localized;
    technologies: string[];
    liveUrl?: string;
    testimonial?: Localized;
};

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
    maystack: {
        problem: {
            en: "The studio needed one credible place to explain its services, prove the quality of its work, and turn interested visitors into project enquiries.",
            ar: "احتاج الاستوديو إلى مكان موثوق يشرح خدماته ويعرض جودة أعماله ويحول الزوار المهتمين إلى طلبات مشاريع.",
        },
        solution: {
            en: "We designed and developed a bilingual, responsive agency website with clear service paths, detailed case studies, smooth interactions, and direct contact options.",
            ar: "صممنا وطورنا موقع وكالة ثنائي اللغة ومتجاوباً مع مسارات واضحة للخدمات ودراسات حالة مفصلة وتفاعلات سلسة وخيارات تواصل مباشرة.",
        },
        result: {
            en: "The finished site gives Maystack a clearer sales story, stronger proof of capability, and a faster route from first visit to project conversation.",
            ar: "يمنح الموقع مايستاك قصة بيع أوضح وإثباتاً أقوى للقدرات ومساراً أسرع من الزيارة الأولى إلى مناقشة المشروع.",
        },
        technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP", "i18next"],
        liveUrl: "/",
    },
    snowball: {
        problem: {
            en: "Student tasks, progress, and reviews were difficult to follow when information was spread across separate workflows and dense screens.",
            ar: "كان من الصعب متابعة مهام الطلاب وتقدمهم ومراجعاتهم عندما كانت المعلومات موزعة بين مسارات وشاشات متعددة.",
        },
        solution: {
            en: "We created a focused dashboard that brings student records, task states, feedback, and program visibility into a consistent responsive interface.",
            ar: "أنشأنا لوحة تحكم تجمع سجلات الطلاب وحالات المهام والملاحظات ورؤية البرامج في واجهة متجاوبة ومتناسقة.",
        },
        result: {
            en: "The platform makes day-to-day information easier to scan and gives students and program teams a more consistent experience across desktop and mobile.",
            ar: "تجعل المنصة المعلومات اليومية أسهل في القراءة وتوفر للطلاب وفرق البرامج تجربة أكثر اتساقاً على الكمبيوتر والموبايل.",
        },
        technologies: ["React", "TypeScript", "Responsive UI", "Dashboard Design"],
    },
    growthline: {
        problem: {
            en: "Growthline needed to present its business offer quickly and professionally without making visitors work through vague or crowded content.",
            ar: "احتاجت جروث لاين إلى عرض خدماتها بسرعة واحترافية دون إجبار الزوار على قراءة محتوى غامض أو مزدحم.",
        },
        solution: {
            en: "We built a responsive marketing website with direct messaging, clear content hierarchy, polished brand visuals, and visible conversion points.",
            ar: "بنينا موقعاً تسويقياً متجاوباً برسائل مباشرة وتسلسل واضح للمحتوى وهوية بصرية مصقولة ونقاط تحويل ظاهرة.",
        },
        result: {
            en: "The new experience explains the offer faster, presents the company more consistently, and gives visitors a clearer next step.",
            ar: "تشرح التجربة الجديدة العرض بصورة أسرع وتقدم الشركة بشكل أكثر اتساقاً وتمنح الزائر خطوة تالية أوضح.",
        },
        technologies: ["React", "TypeScript", "Responsive Web Design", "SEO-ready Structure"],
    },
    core: {
        problem: {
            en: "Core Istanbul needed a digital presence that could communicate the character of the brand while still making its offer easy to understand.",
            ar: "احتاجت كور إسطنبول إلى حضور رقمي يعبر عن شخصية العلامة مع إبقاء عرضها واضحاً وسهل الفهم.",
        },
        solution: {
            en: "We designed and developed an image-led website with strong visual pacing, practical content sections, and a responsive experience for every screen size.",
            ar: "صممنا وطورنا موقعاً يعتمد على الصور بإيقاع بصري قوي وأقسام محتوى عملية وتجربة متجاوبة مع جميع أحجام الشاشات.",
        },
        result: {
            en: "The website gives the brand a more distinctive first impression and makes its story easier to explore on both desktop and mobile.",
            ar: "يمنح الموقع العلامة انطباعاً أول أكثر تميزاً ويجعل استكشاف قصتها أسهل على الكمبيوتر والموبايل.",
        },
        technologies: ["React", "TypeScript", "Responsive Web Design", "Motion Design"],
        liveUrl: "https://www.corebhub.com",
    },
    "hope-team": {
        problem: {
            en: "Hope Team needed a welcoming website that could explain its mission clearly and help community members understand how to connect.",
            ar: "احتاج فريق هوب إلى موقع مرحب يشرح رسالته بوضوح ويساعد أفراد المجتمع على معرفة كيفية التواصل.",
        },
        solution: {
            en: "We created a warm, mobile-friendly website with mission-first content, strong imagery, readable sections, and clear contact paths.",
            ar: "أنشأنا موقعاً دافئاً ومناسباً للموبايل يبرز الرسالة أولاً ويستخدم صوراً قوية وأقساماً سهلة القراءة ومسارات تواصل واضحة.",
        },
        result: {
            en: "The finished site makes the organization easier to understand, gives its mission more visibility, and reduces friction for people who want to engage.",
            ar: "يجعل الموقع المنظمة أسهل في الفهم ويمنح رسالتها ظهوراً أكبر ويقلل العوائق أمام الراغبين في المشاركة.",
        },
        technologies: ["React", "TypeScript", "Responsive Web Design", "Accessible UI"],
    },
};
