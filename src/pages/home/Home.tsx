import Hero from "./hero.tsx";
import Services from "./services.tsx";
import LaptopShowcase from "./laptop.tsx";

export default function Home() {
    return (
        <div className="ms-page">
            <Hero />
            <LaptopShowcase />
            <Services />
        </div>
    );
}
