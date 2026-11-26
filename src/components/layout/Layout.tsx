import type { ReactNode } from "react";
import { useLocale } from "../../i18n/useLocale.ts";
import { SmoothScroll } from "../../motion/SmoothScroll.tsx";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import { Sky } from "./Sky.tsx";
import { WhatsAppButton } from "./WhatsAppButton.tsx";

export function Layout({ children }: { children: ReactNode }) {
    const { t, lang } = useLocale();

    return (
        <SmoothScroll>
            <a className="visually-hidden" href="#main">
                {t("nav.skip")}
            </a>
            <Sky />
            <Header />
            <main id="main" key={lang}>{children}</main>
            <Footer />
            <WhatsAppButton />
        </SmoothScroll>
    );
}
