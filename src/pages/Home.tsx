import { useEffect } from "react";
import { useLocation } from "react-router-dom";


import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";


import Hero from '../sections/hero.tsx'
import Services from "../sections/services.tsx";
import Portfolio from "../sections/portfolio.tsx";
import Why from "../sections/why.tsx"
import Contact from "../sections/contact.tsx"



export default function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash === "#home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [hash]);

    return (
        <div className="home">

            {/* HERO */}
            <Hero/>
            {/* OUR SERVICES */}
            <Services/>

            {/* PORTFOLIO */}
            <Portfolio/>

            {/* WHY MAYSTACK */}
            <Why/>

            {/* CONTACT */}
            <Contact/>


        </div>
    );
}
