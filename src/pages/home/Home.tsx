import Hero from "../../features/home/Hero/Hero.tsx";
import Services from "./services.tsx";
import Projects from "./projects.tsx";
import Why from "./why.tsx";
import FlightCta from "./FlightCta.tsx";
import Proof from "./Proof.tsx";

export default function Home() {
    return (
        <div className="ms-page ms-home-page">
            <Hero />
            <div className="ms-home-content">
                <Why />
                <Services />
                <Projects />
                <Proof />
                <FlightCta />
            </div>
        </div>
    );
}

