type Text = { en: string; ar: string };
export type ProjectBrief = { scope: Text; challenge: Text; work: Text; outcome: Text };

// Qualitative summaries of existing case studies, not measured performance claims.
export const projectBriefs: Record<string, ProjectBrief> = {
    core: {
        scope: { en: "Brand website redesign", ar: "إعادة تصميم موقع العلامة" },
        challenge: { en: "Make a distinctive brand easier to understand online.", ar: "توضيح هوية العلامة وخدماتها عبر الإنترنت." },
        work: { en: "Content structure, interface design, and responsive development.", ar: "تنظيم المحتوى وتصميم الواجهات والتطوير المتجاوب." },
        outcome: { en: "One coherent brand experience across desktop and mobile.", ar: "تجربة علامة متناسقة على الكمبيوتر والموبايل." },
    },
    growthline: {
        scope: { en: "Business website & digital presence", ar: "موقع أعمال وحضور رقمي" },
        challenge: { en: "Explain a broad business offer without overwhelming visitors.", ar: "شرح الخدمات المتنوعة دون إرباك الزوار." },
        work: { en: "Messaging hierarchy, web design, and responsive development.", ar: "ترتيب الرسائل وتصميم الموقع والتطوير المتجاوب." },
        outcome: { en: "A structured service story with clear enquiry paths.", ar: "عرض منظم للخدمات ومسارات واضحة للاستفسارات." },
    },
    snowball: {
        scope: { en: "Student platform & dashboard design", ar: "منصة طلابية وتصميم لوحات التحكم" },
        challenge: { en: "Bring student tasks, progress, and reviews into one clear view.", ar: "جمع مهام الطلاب وتقدمهم ومراجعاتهم في واجهة واضحة." },
        work: { en: "Dashboard UX, interface design, and responsive implementation.", ar: "تجربة لوحات التحكم وتصميم الواجهات والتنفيذ المتجاوب." },
        outcome: { en: "A consistent workspace for students and program teams.", ar: "مساحة عمل متناسقة للطلاب وفرق البرامج." },
    },
    "hope-team": {
        scope: { en: "Community website design & development", ar: "تصميم وتطوير موقع مجتمعي" },
        challenge: { en: "Make the mission clear and help people find how to connect.", ar: "توضيح الرسالة ومساعدة الناس على التواصل." },
        work: { en: "Mission-first content, interface design, and development.", ar: "محتوى يبرز الرسالة وتصميم الواجهات والتطوير." },
        outcome: { en: "An accessible, mobile-friendly home for the organization.", ar: "حضور رقمي سهل الاستخدام ومناسب للموبايل." },
    },
    maystack: {
        scope: { en: "Agency website & portfolio", ar: "موقع الوكالة ومعرض أعمالها" },
        challenge: { en: "Connect services, project evidence, and enquiries.", ar: "ربط الخدمات والأعمال وطلبات المشاريع." },
        work: { en: "Brand experience, bilingual interfaces, and development.", ar: "تجربة العلامة وواجهات ثنائية اللغة والتطوير." },
        outcome: { en: "A shared design system from the first visit to the project brief.", ar: "نظام تصميم موحد من الزيارة الأولى إلى تفاصيل المشروع." },
    },
};
