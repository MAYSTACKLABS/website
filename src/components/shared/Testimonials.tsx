import { Quote } from "lucide-react";
import { testimonials, testimonialPlaceholders } from "../../data/socialProof.ts";
import { useLanguage } from "../../context/LanguageContext.tsx";

export default function Testimonials() {
    const { lang } = useLanguage();
    return <section className="testimonials ms-container section-space" aria-labelledby="testimonials-title">
        <div className="section-heading"><h2 id="testimonials-title">{lang === "ar" ? "آراء العملاء" : "Testimonials"}</h2></div>
        {!testimonials.length && <p className="testimonial-preview-note">{lang === "ar" ? "معاينة — ستُضاف آراء العملاء المعتمدة قريباً." : "Preview — approved customer quotes coming soon."}</p>}
        <div className="testimonial-grid">{testimonials.length ? testimonials.map(item => <figure key={`${item.company}-${item.name}`}>
            <Quote aria-hidden="true" /><blockquote>{item.quote[lang]}</blockquote>
            <figcaption><strong>{item.name}</strong><span>{item.role[lang]} · {item.company}</span></figcaption>
        </figure>) : testimonialPlaceholders.map(item => <figure className="testimonial-placeholder" key={item.slug}>
            <Quote aria-hidden="true" />
            <div className="testimonial-skeleton" aria-hidden="true"><span /><span /><span /></div>
            <figcaption><strong>{item.name}</strong><span>{lang === "ar" ? "بانتظار رأي العميل" : "Customer quote pending"}</span></figcaption>
        </figure>)}</div>
    </section>;
}
