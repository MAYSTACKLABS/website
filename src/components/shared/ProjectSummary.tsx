import { useLanguage } from "../../context/LanguageContext.tsx";
import { projectBriefs } from "../../data/projectBriefs.ts";

export default function ProjectSummary({ slug }: { slug: string }) {
    const { lang } = useLanguage();
    const brief = projectBriefs[slug];
    if (!brief) return null;
    const rows = [
        { label: { en: "The challenge", ar: "التحدي" }, text: brief.challenge },
        { label: { en: "Our contribution", ar: "دورنا" }, text: brief.work },
        { label: { en: "Delivered", ar: "ما قدمناه" }, text: brief.outcome },
    ];
    return <dl className="project-summary">{rows.map(row => <div key={row.label.en}><dt>{row.label[lang]}</dt><dd>{row.text[lang]}</dd></div>)}</dl>;
}
