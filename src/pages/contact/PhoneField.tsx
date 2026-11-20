import { useEffect, useMemo, useRef, useState } from "react";
import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";
import { useLocale } from "../../i18n/useLocale.ts";
import { parseContactPhone } from "../../utils/phone.ts";

type Props = {
    country: CountryCode;
    value: string;
    onCountryChange: (country: CountryCode) => void;
    onChange: (value: string) => void;
};

/** Optional phone number with a country picker. Pasting "+44…" picks the country for you. */
export function PhoneField({ country, value, onCountryChange, onChange }: Props) {
    const { t, lang } = useLocale();
    const input = useRef<HTMLInputElement>(null);
    const [touched, setTouched] = useState(false);

    const countries = useMemo(() => {
        const names = new Intl.DisplayNames([lang], { type: "region" });
        return getCountries()
            .map((code) => ({ code, name: names.of(code) ?? code }))
            .sort((a, b) => a.name.localeCompare(b.name, lang));
    }, [lang]);

    const invalid = Boolean(value.trim()) && !parseContactPhone(value, country)?.isPossible();
    useEffect(
        () => input.current?.setCustomValidity(invalid ? t("contact.phoneError") : ""),
        [invalid, t],
    );

    const handleChange = (next: string) => {
        const parsed = parseContactPhone(next, country);
        if (/^\s*(\+|00)/.test(next) && parsed?.country) {
            onCountryChange(parsed.country);
            onChange(parsed.formatNational());
        } else {
            onChange(next);
        }
        setTouched(false);
    };

    return (
        <fieldset className="field phone">
            <legend>{t("contact.phone")}</legend>
            <div className="phone__row" dir="ltr">
                <select
                    aria-label={t("contact.country")}
                    value={country}
                    onChange={(event) => onCountryChange(event.target.value as CountryCode)}
                >
                    {countries.map(({ code, name }) => (
                        <option key={code} value={code}>
                            {name} (+{getCountryCallingCode(code)})
                        </option>
                    ))}
                </select>
                <input
                    ref={input}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    aria-label={t("contact.phone")}
                    aria-invalid={touched && invalid}
                    value={value}
                    onInvalid={() => setTouched(true)}
                    onChange={(event) => handleChange(event.target.value)}
                />
            </div>
            {touched && invalid && (
                <p className="field__error" role="alert">
                    {t("contact.phoneError")}
                </p>
            )}
        </fieldset>
    );
}
