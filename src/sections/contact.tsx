import waving from "../assets/figures/waving.png";
import {t} from "i18next";

const Contact = () => {
    return (
        <section className="home-contact" id="contact">
            <div className="home-contact-inner">
                <div className="home-contact-left">
                    <h2 className="home-contact-title">{t("home.sections.contactTitle")}</h2>
                    <img className="home-contact-avatar" src={waving} alt="" />
                </div>

                <form className="home-contact-form">
                    <input className="input" placeholder={t("contact.placeholders.name")} />
                    <input className="input" placeholder={t("contact.placeholders.email")} />
                    <input className="input" placeholder={t("home.contact.placeholders.phone")} />
                    <input className="input" placeholder={t("home.contact.placeholders.service")} />
                    <textarea className="textarea" placeholder={t("contact.placeholders.message")} />

                    <button type="button" className="btn-primary">
                        {t("contact.actions.send")}
                    </button>
                </form>
            </div>
        </section>
    )
}
export default Contact
