import laptop2 from "../assets/laptop2.png";
import project1 from "../assets/project1.png";
import {t} from "i18next";

const Portfolio = () => {
    return (
        <section className="home-portfolio" id="work">
            <div className="home-portfolio-head">
                <h2 className="home-portfolio-title">{t("home.sections.portfolioTitle")}</h2>
                <p className="home-portfolio-sub">{t("home.sections.portfolioSub")}</p>
            </div>


            <div className="laptop-clip">
                <div className="laptop-mock">
                    <img className="laptop-frame" src={laptop2} alt="Laptop mock" />

                    {/* SCREEN CONTENT */}
                    <div className="laptop-screen">
                        <img className="laptop-screen-img" src={project1} alt="Project preview" />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Portfolio
