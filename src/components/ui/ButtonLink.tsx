import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./ButtonLink.css";

type Props = {
    to: string;
    children: ReactNode;
    variant?: "primary" | "ghost" | "text";
    className?: string;
};

/** Every call-to-action on the site. Internal paths use the router; web links open a new tab. */
export function ButtonLink({ to, children, variant = "primary", className = "" }: Props) {
    const classes = `button button--${variant} ${className}`;
    const content = (
        <>
            <span>{children}</span>
            <ArrowUpRight className="button__icon" aria-hidden="true" />
        </>
    );

    if (to.startsWith("/")) {
        return (
            <Link to={to} className={classes}>
                {content}
            </Link>
        );
    }

    const newTab = to.startsWith("http");
    return (
        <a href={to} className={classes} {...(newTab && { target: "_blank", rel: "noreferrer" })}>
            {content}
        </a>
    );
}
