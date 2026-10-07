import { Code2, Globe2, PenTool, Smartphone } from "lucide-react";
import { projects } from "./projectsData.ts";

export const services = [
    {
        id: "design", Icon: PenTool, title: { en: "UI/UX design", ar: "تصميم تجربة المستخدم" },
        description: { en: "Make every interaction feel effortless. We turn complex ideas into clear, intuitive digital experiences.", ar: "نجعل كل تفاعل بسيطاً، ونحوّل الأفكار المعقدة إلى تجارب رقمية واضحة وسهلة." },
        deliverables: { en: ["User journeys", "Interface design", "Interactive prototypes", "Design systems"], ar: ["مسارات المستخدم", "تصميم الواجهات", "نماذج تفاعلية", "أنظمة التصميم"] },
        project: projects.find(p => p.slug === "core")!,
    },
    {
        id: "mobile", Icon: Smartphone, title: { en: "Mobile applications", ar: "تطبيقات الموبايل" },
        description: { en: "Useful in the moments that matter. Thoughtful mobile experiences built around what your users need to do.", ar: "تجارب موبايل مدروسة، نطورها حول احتياجات المستخدمين وما يريدون إنجازه." },
        deliverables: { en: ["Product strategy", "App interfaces", "Development", "Release support"], ar: ["استراتيجية المنتج", "واجهات التطبيقات", "التطوير", "دعم الإطلاق"] },
        project: projects.find(p => p.slug === "snowball")!,
    },
    {
        id: "web", Icon: Globe2, title: { en: "Web development", ar: "تطوير المواقع" },
        description: { en: "A website that earns its place in your business. Fast, accessible, and built to work beautifully on every screen.", ar: "موقع يدعم أعمالك، سريع وسهل الاستخدام ويعمل بإتقان على جميع الشاشات." },
        deliverables: { en: ["Brand websites", "Web applications", "Responsive development", "Performance"], ar: ["مواقع العلامات التجارية", "تطبيقات الويب", "تطوير متجاوب", "تحسين الأداء"] },
        project: projects.find(p => p.slug === "growthline")!,
    },
    {
        id: "platforms", Icon: Code2, title: { en: "Custom platforms", ar: "المنصات المخصصة" },
        description: { en: "Bring your workflows together. Dashboards, portals, and business tools designed around the way your team works.", ar: "نجمع مسارات عملك في لوحات تحكم وبوابات وأدوات مصممة لطريقة عمل فريقك." },
        deliverables: { en: ["Dashboards", "Business portals", "Connected workflows", "Ongoing improvement"], ar: ["لوحات التحكم", "بوابات الأعمال", "مسارات عمل مترابطة", "تحسين مستمر"] },
        project: projects.find(p => p.slug === "snowball")!,
    },
];
