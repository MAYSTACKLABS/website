import { useLocation } from "react-router-dom";
import ProjectCta from "./shared/ProjectCta.tsx";

export default function Footer() {
    const { pathname } = useLocation();
    if (pathname === "/contact") return null;
    return <footer className="ms-footer"><ProjectCta /></footer>;
}

