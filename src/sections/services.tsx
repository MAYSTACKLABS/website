import {t} from "i18next";

const Services = () => {
    return (
        <section className="home-block" id="services">
            <div className="home-block-head">
                <h2 className="home-block-title">{t("home.sections.servicesTitle")}</h2>
            </div>

            <div className="home-services-list">
                <div className="home-services-item">{t("home.services.uiux")}</div>
                <div className="home-services-item">{t("home.services.web")}</div>
                <div className="home-services-item">{t("home.services.mobile")}</div>
            </div>
        </section>
    )
}
export default Services
