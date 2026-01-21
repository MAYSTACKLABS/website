import thinking from "../assets/figures/thinking.png";
import {t} from "i18next";

const Why = () => {
    return (
        <section className="home-why" id="why">
            <div className="home-why-inner">
                <div className="home-why-left">
                    <h2 className="home-why-title">{t("home.sections.whyTitle")}</h2>

                    <ul className="home-why-list">
                        <li className="home-why-item">
                            <div className="home-why-dot" />
                            <div>
                                <div className="home-why-item-title">{t("home.why.items.quality.title")}</div>
                                <div className="home-why-item-desc">{t("home.why.items.quality.desc")}</div>
                            </div>
                        </li>

                        <li className="home-why-item">
                            <div className="home-why-dot" />
                            <div>
                                <div className="home-why-item-title">{t("home.why.items.scale.title")}</div>
                                <div className="home-why-item-desc">{t("home.why.items.scale.desc")}</div>
                            </div>
                        </li>

                        <li className="home-why-item">
                            <div className="home-why-dot" />
                            <div>
                                <div className="home-why-item-title">{t("home.why.items.fast.title")}</div>
                                <div className="home-why-item-desc">{t("home.why.items.fast.desc")}</div>
                            </div>
                        </li>

                        <li className="home-why-item">
                            <div className="home-why-dot" />
                            <div>
                                <div className="home-why-item-title">{t("home.why.items.support.title")}</div>
                                <div className="home-why-item-desc">{t("home.why.items.support.desc")}</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="home-why-right">
                    <img className="home-why-figure" src={thinking} alt="" />
                </div>
            </div>
        </section>
    )
}
export default Why
