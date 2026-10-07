import Hero from "./Hero.tsx";
import SelectedWork from "./SelectedWork.tsx";
import Process from "../../components/shared/Process.tsx";
import Testimonials from "../../components/shared/Testimonials.tsx";
import { site } from "../../config/site.ts";
import { usePageMetadata } from "../../hooks/usePageMetadata.ts";
import { useLanguage } from "../../context/LanguageContext.tsx";

export default function Home() {
    const { lang } = useLanguage();
    usePageMetadata({ title: lang === "ar" ? "مايستاك | تصميم وتطوير المنتجات الرقمية" : "Maystack | Digital product design & development", description: lang === "ar" ? "فريق واحد لتصميم الواجهات وتطوير المواقع وتطبيقات الموبايل والمنصات المخصصة." : "UI/UX design, mobile apps, websites, and custom platforms. One team from the first idea to launch." });
    return <div className="home-page"><Hero /><Process /><SelectedWork />{site.features.testimonials ? <Testimonials /> : null}</div>;
}

