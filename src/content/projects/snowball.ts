import type { Project } from "./types.ts";
import dashboard from "../../assets/projects/snowball/dashboard-current.webp";
import calendar from "../../assets/projects/snowball/calendar-current.webp";
import mobileHome from "../../assets/projects/snowball/mobile-current.webp";
import mobileCalendar from "../../assets/projects/snowball/mobile-calendar-current.webp";
import mobileTasks from "../../assets/projects/snowball/mobile1.webp";
import mobileWorkspace from "../../assets/projects/snowball/mobile3.webp";

export const snowball: Project = {
    slug: "snowball",
    title: { en: "Snowball Foundation", ar: "سنوبول فاونديشن" },
    category: { en: "Student platform", ar: "منصة طلابية" },
    kind: "platform",
    intro: {
        en: "A focused platform for students, tasks, reviews, and program visibility.",
        ar: "منصة مركزة للطلاب والمهام والمراجعات ورؤية البرامج بوضوح.",
    },
    challenge: {
        en: "Student tasks, progress, and reviews were difficult to follow when information was spread across separate workflows and dense screens.",
        ar: "كان من الصعب متابعة مهام الطلاب وتقدمهم ومراجعاتهم عندما كانت المعلومات موزعة بين مسارات وشاشات متعددة.",
    },
    approach: {
        en: "We created a focused dashboard that brings student records, task states, feedback, and program visibility into a consistent responsive interface.",
        ar: "أنشأنا لوحة تحكم تجمع سجلات الطلاب وحالات المهام والملاحظات ورؤية البرامج في واجهة متجاوبة ومتناسقة.",
    },
    outcome: {
        en: "The platform makes day-to-day information easier to scan and gives students and program teams a more consistent experience across desktop and mobile.",
        ar: "تجعل المنصة المعلومات اليومية أسهل في القراءة وتوفر للطلاب وفرق البرامج تجربة أكثر اتساقاً على الكمبيوتر والموبايل.",
    },
    highlights: [
        { en: "Responsive dashboard flows", ar: "لوحات متجاوبة" },
        { en: "Clear task and review states", ar: "حالات مهام ومراجعات واضحة" },
        { en: "Mobile-friendly student views", ar: "واجهات طلابية مناسبة للموبايل" },
    ],
    stack: ["React", "TypeScript", "Responsive UI", "Dashboard Design"],
    liveUrl: "https://sbscholar.org",
    desktop: [dashboard, calendar],
    mobile: [mobileHome, mobileCalendar, mobileTasks, mobileWorkspace],
};
