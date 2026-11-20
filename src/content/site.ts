/** Contact details and navigation, shared by the header, footer and contact page. */
export const site = {
    name: "Maystack",
    email: "contact@maystack.net",
    whatsapp: "9647755462257",
    phoneLabel: "+964 775 546 2257",
};

/** Header links. Labels are i18n keys under "nav". */
export const navigation = [
    { to: "/services", label: "nav.services" },
    { to: "/portfolio", label: "nav.work" },
    { to: "/contact", label: "nav.contact" },
] as const;
