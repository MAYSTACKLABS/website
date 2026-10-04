import { NavLink } from "react-router-dom";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoWhite from "../assets/logos/whiteFull.png";

const links = [
    { key: "nav.home", to: "/" },
    { key: "nav.services", to: "/services" },
    { key: "nav.work", to: "/portfolio" },
    { key: "nav.contact", to: "/contact" },
];

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="ms-footer">
            <div className="ms-container">
                <div className="flex flex-col items-center gap-6 py-10 text-center">
                    <NavLink to="/" aria-label="MayStack home">
                        <img src={logoWhite} alt="MayStack" className="h-8 w-auto" />
                    </NavLink>

                    <nav className="flex flex-wrap justify-center gap-5 text-sm font-semibold text-current/58">
                        {links.map((link) => (
                            <NavLink key={link.to} to={link.to} className="transition hover:text-primary">
                                {t(link.key)}
                            </NavLink>
                        ))}
                    </nav>

                    <a
                        href="mailto:contact@mestack.com"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current/12 px-4 text-sm font-semibold text-current/70 transition hover:text-primary"
                    >
                        <Mail className="h-4 w-4" />
                        contact@mestack.com
                    </a>
                </div>
            </div>
        </footer>
    );
}

