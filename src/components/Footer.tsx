import { NavLink } from "react-router-dom";
import { Github, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoWhite from "../assets/logos/whiteFull.png";

const links = [
    { key: "nav.home", to: "/" },
    { key: "nav.services", to: "/services" },
    { key: "nav.work", to: "/portfolio" },
    { key: "nav.about", to: "/about" },
    { key: "nav.contact", to: "/contact" },
];

const socials = [Instagram, Linkedin, Github];

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="ms-footer">
            <div className="ms-container">
                <div className="flex flex-col items-center gap-6 border-t border-current/10 py-10 text-center">
                    <NavLink to="/" aria-label="MayStack home">
                        <img src={logoWhite} alt="MayStack" className="h-8 w-auto" />
                    </NavLink>

                    <nav className="flex flex-wrap justify-center gap-5 text-sm font-semibold text-current/58">
                        {links.map((link) => (
                            <NavLink key={link.to} to={link.to} className="transition hover:text-[#5abce4]">
                                {t(link.key)}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex justify-center gap-3">
                        {socials.map((Icon, index) => (
                            <span key={index} className="grid h-9 w-9 place-items-center rounded-full border border-current/12 bg-current/[0.04] text-current/58">
                                <Icon className="h-4 w-4" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
