import type { ReactNode } from "react";
import { SplitHeading } from "../../motion/SplitHeading.tsx";
import "./PageIntro.css";

type Props = { eyebrow: string; title: string; lead?: string; children?: ReactNode };

/** The opening of every inner page: a label, one large statement, an optional lead and actions. */
export function PageIntro({ eyebrow, title, lead, children }: Props) {
    return (
        <header className="page-intro container">
            <p className="eyebrow">{eyebrow}</p>
            <SplitHeading as="h1" trigger="load" className="display page-intro__title">
                {title}
            </SplitHeading>
            {lead && <p className="page-intro__lead muted">{lead}</p>}
            {children}
        </header>
    );
}
