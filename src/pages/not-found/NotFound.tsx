import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.tsx";

export default function NotFound() {
    const { lang } = useLanguage();

    return (
        <section className="not-found-page">
            <p>404</p>
            <h1>{lang === "ar" ? "الصفحة غير موجودة" : "Page not found"}</h1>
            <span>
                {lang === "ar"
                    ? "قد يكون الرابط قد تغير أو لم يعد متاحاً."
                    : "The page may have moved or is no longer available."}
            </span>
            <Link to="/">
                <ArrowLeft aria-hidden="true" />
                {lang === "ar" ? "العودة للرئيسية" : "Back to home"}
            </Link>
        </section>
    );
}
