import type { Localized } from "../../i18n/useLocale.ts";

export type Project = {
    slug: string;
    title: Localized;
    category: Localized;
    kind: "website" | "platform";
    /** One line, used on cards and previews. */
    intro: Localized;
    challenge: Localized;
    approach: Localized;
    outcome: Localized;
    highlights: Localized[];
    stack: string[];
    liveUrl?: string;
    /** The first desktop and mobile screens are the project's cover. */
    desktop: string[];
    mobile: string[];
};
