import standing from "../assets/figures/standing.png";
import {t} from "i18next";

const Hero = () => {
    return (
        <section className="home-hero" id="homes">
            <div className="home-hero-inner">
                <div className="home-hero-left">
                    <div className="home-hero-badge">{t("home.hero.badge")}</div>

                    <h1 className="home-hero-title">
                        <span>{t("home.hero.line1")}</span>
                        <span>{t("home.hero.line2")}</span>
                        <span>{t("home.hero.line3")}</span>
                    </h1>
                </div>

                <div className="home-hero-right">
                    <div className="home-hero-avatar">
                        <img src={standing} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Hero
