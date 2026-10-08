import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js/min";

export function parseContactPhone(value: string, country: CountryCode) {
    // Accept pasted international numbers as well as national numbers and Arabic digits.
    return parsePhoneNumberFromString(value.trim().replace(/^00/, "+"), { defaultCountry: country, extract: false });
}
