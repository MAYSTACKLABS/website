import { useState } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { usePageMeta } from "../../hooks/usePageMeta.ts";
import { site } from "../../content/site.ts";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import { EnquiryWizard } from "./EnquiryWizard.tsx";
import "./Contact.css";

export default function Contact() {
    const { t } = useLocale();
    const [sent, setSent] = useState(false);
    usePageMeta(t("contact.meta.title"), t("contact.meta.description"));

    return (
        <section className="contact container">
            <aside className="contact__intro">
                <SplitHeading key={String(sent)} as="h1" trigger="load" className="display">
                    {t(sent ? "contact.sentTitle" : "contact.title")}
                </SplitHeading>
                <p className="muted">{t(sent ? "contact.sentText" : "contact.intro")}</p>
                <dl className="contact__direct">
                    <div>
                        <dt className="eyebrow">{t("contact.emailUs")}</dt>
                        <dd>
                            <a href={`mailto:${site.email}`}>{site.email}</a>
                        </dd>
                    </div>
                    <div>
                        <dt className="eyebrow">WhatsApp</dt>
                        <dd>
                            <a
                                href={`https://wa.me/${site.whatsapp}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <bdi>{site.phoneLabel}</bdi>
                            </a>
                        </dd>
                    </div>
                </dl>
            </aside>
            {!sent && <EnquiryWizard onSent={() => setSent(true)} />}
        </section>
    );
}
