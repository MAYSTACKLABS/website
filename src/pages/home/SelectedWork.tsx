import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { projects } from "../../data/projectsData.ts";
import DeviceShowcase from "../../components/shared/DeviceShowcase.tsx";
import ProjectSummary from "../../components/shared/ProjectSummary.tsx";
import { useSwipe } from "../../hooks/useSwipe.ts";

const featured = projects.filter(p=>p.slug!=="maystack");
export default function SelectedWork() {
    const { lang } = useLanguage();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const section = useRef<HTMLElement>(null);
    const changeProject = (direction: number) => {
        setIndex(current => (current + direction + featured.length) % featured.length);
        setPaused(true);
    };
    const swipe = useSwipe(direction => changeProject(lang === "ar" ? -direction : direction));
    useEffect(() => {
        if (paused || hovered) return;
        const timer = window.setInterval(() => {
            const element = section.current;
            if (!element || document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches || element.contains(document.activeElement)) return;
            const rect = element.getBoundingClientRect();
            if (rect.top < innerHeight && rect.bottom > 0) setIndex(current => (current + 1) % featured.length);
        }, 7000);
        return () => window.clearInterval(timer);
    }, [paused, hovered]);
    const project = featured[index];
    return <section ref={section} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="selected-work section-space" id="projects"><div className="ms-container">
        <div className="section-heading"><div><h2>{lang === "ar" ? "أفكار أصبحت واقعاً." : "Ideas made real."}</h2></div><Link className="text-link" to="/portfolio">{lang === "ar" ? "كل المشاريع" : "View all projects"}<ArrowUpRight aria-hidden="true" /></Link></div>
        <div className="work-feature">
            <div className="work-feature-visual" {...swipe} tabIndex={0} role="region" aria-label={lang === "ar" ? "اسحب لتغيير المشروع" : "Swipe or use arrow keys to change project"} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); changeProject((event.key === "ArrowRight" ? 1 : -1) * (lang === "ar" ? -1 : 1)); } }}><DeviceShowcase desktop={project.desktopImages[0]} mobile={project.mobileImages[0]} name={project.title[lang]} href={`/portfolio/${project.slug}`} /></div>
            <div className="work-story">
                <div aria-live={paused ? "polite" : "off"}><h3>{project.title[lang]}</h3><ProjectSummary slug={project.slug} /></div>
                <Link className="text-link" to={`/portfolio/${project.slug}`}>{lang === "ar" ? "اكتشف المشروع" : "Explore the project"}<ArrowUpRight aria-hidden="true" /></Link>
                <div className="work-controls" aria-label={lang === "ar" ? "اختر مشروعاً" : "Choose a project"}>{featured.map((item, position) => <button type="button" key={item.slug} aria-label={`${position + 1}: ${item.title[lang]}`} aria-pressed={position === index} onClick={() => { setIndex(position); setPaused(true); }}>{String(position + 1).padStart(2, "0")}</button>)}<button type="button" className="work-autoplay" aria-label={paused ? "Play project slideshow" : "Pause project slideshow"} aria-pressed={!paused} onClick={() => setPaused(!paused)}>{paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}</button></div>
            </div>
        </div>
    </div></section>;
}
