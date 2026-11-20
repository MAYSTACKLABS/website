import type { CountryCode } from "libphonenumber-js/min";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "../../i18n/useLocale.ts";
import { PhoneField } from "./PhoneField.tsx";
import "../../components/ui/ButtonLink.css";

export type Details = { name: string; email: string; phone: string; message: string };

type Props = {
    details: Details;
    onChange: (details: Details) => void;
    country: CountryCode;
    onCountryChange: (country: CountryCode) => void;
    sending: boolean;
};

/** The final step: who to reply to. Name and email are required; phone and message are optional. */
export function DetailsStep({ details, onChange, country, onCountryChange, sending }: Props) {
    const { t } = useLocale();
    const set = (key: keyof Details) => (value: string) => onChange({ ...details, [key]: value });

    return (
        <div className="details">
            <label className="field">
                <span>{t("contact.name")}</span>
                <input
                    required
                    autoComplete="name"
                    value={details.name}
                    onChange={(event) => set("name")(event.target.value)}
                />
            </label>
            <label className="field">
                <span>{t("contact.email")}</span>
                <input
                    required
                    type="email"
                    autoComplete="email"
                    value={details.email}
                    onChange={(event) => set("email")(event.target.value)}
                />
            </label>
            <PhoneField
                country={country}
                value={details.phone}
                onCountryChange={onCountryChange}
                onChange={set("phone")}
            />
            <label className="field">
                <span>{t("contact.message")}</span>
                <textarea
                    rows={3}
                    value={details.message}
                    onChange={(event) => set("message")(event.target.value)}
                />
            </label>
            <button type="submit" className="button button--primary" disabled={sending}>
                <span>{t(sending ? "contact.sending" : "contact.send")}</span>
                <ArrowUpRight className="button__icon" aria-hidden="true" />
            </button>
        </div>
    );
}
