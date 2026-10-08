import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";
import { parseContactPhone } from "../../utils/phone.ts";

type Props = {
    lang: "en" | "ar";
    country: CountryCode;
    value: string;
    onCountryChange: (country: CountryCode) => void;
    onChange: (value: string) => void;
};

export default function PhoneField({ lang, country, value, onCountryChange, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showError, setShowError] = useState(false);
    const countries = useMemo(() => {
        const names = new Intl.DisplayNames([lang], { type: "region" });
        return getCountries().map((code) => ({ code, name: names.of(code) || code }))
            .sort((a, b) => a.name.localeCompare(b.name, lang));
    }, [lang]);
    const error = value.trim() && !parseContactPhone(value, country)?.isPossible()
        ? (lang === "ar" ? "تحقق من رقم الهاتف ورمز الدولة." : "Check the phone number and country code.") : "";

    useEffect(() => { inputRef.current?.setCustomValidity(error); }, [error]);

    return <fieldset className="contact-phone-field">
        <legend>{lang === "ar" ? "رقم الهاتف (اختياري)" : "Phone number (optional)"}</legend>
        <div className="contact-phone-row" dir="ltr">
            <div className="contact-country-control">
                <label className="sr-only" htmlFor="phone-country">{lang === "ar" ? "الدولة ورمز الاتصال" : "Country and calling code"}</label>
                <span className="contact-country-display" aria-hidden="true"><span>{country} +{getCountryCallingCode(country)}</span><ChevronDown /></span>
                <select id="phone-country" name="phoneCountry" value={country} onChange={(event) => { onCountryChange(event.target.value as CountryCode); setShowError(false); }}>
                    {countries.map(({ code, name }) => <option key={code} value={code}>{name} (+{getCountryCallingCode(code)})</option>)}
                </select>
            </div>
            <label className="sr-only" htmlFor="contact-phone">{lang === "ar" ? "رقم الهاتف" : "Phone number"}</label>
            <input ref={inputRef} id="contact-phone" name="phone" type="tel" autoComplete="tel-national" inputMode="tel" dir="ltr" value={value}
                placeholder={lang === "ar" ? "رقم الهاتف" : "Phone number"}
                aria-invalid={showError && Boolean(error)} aria-describedby={showError && error ? "phone-error" : undefined}
                onInvalid={() => setShowError(true)}
                onChange={(event) => {
                    const next = event.target.value;
                    const parsed = parseContactPhone(next, country);
                    if (/^\s*(\+|00)/.test(next) && parsed?.country) {
                        onCountryChange(parsed.country);
                        onChange(parsed.formatNational());
                    } else onChange(next);
                    setShowError(false);
                }} />
        </div>
        {showError && error && <p className="contact-phone-error" id="phone-error" role="alert">{error}</p>}
    </fieldset>;
}
