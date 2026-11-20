import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import type { CountryCode } from "libphonenumber-js/min";
import { useLocale } from "../../i18n/useLocale.ts";
import { intentQuestion, paths, type Question } from "../../content/enquiry.ts";
import { parseContactPhone } from "../../utils/phone.ts";
import { DetailsStep, type Details } from "./DetailsStep.tsx";
import { submitEnquiry } from "./submitEnquiry.ts";

type Status = "idle" | "sending" | "sent" | "error";

/** One question at a time. Picking an answer moves on; the last step collects contact details. */
export function EnquiryWizard({ onSent }: { onSent: () => void }) {
    const { t, pick } = useLocale();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [details, setDetails] = useState<Details>({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [country, setCountry] = useState<CountryCode>("IQ");
    const [status, setStatus] = useState<Status>("idle");
    const heading = useRef<HTMLHeadingElement>(null);

    const questions: Question[] = [intentQuestion, ...(paths[answers.intent] ?? [])];
    const onDetails = step >= questions.length;
    const total = answers.intent ? questions.length + 1 : 4;
    const question = questions[step];

    // Move focus to each new question so keyboard and screen-reader users follow along.
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        heading.current?.focus({ preventScroll: true });
    }, [step]);

    const choose = (value: string) => {
        // Changing the first answer starts a different path, so drop the old path's answers.
        setAnswers((current) =>
            question.key === "intent" && current.intent !== value
                ? { intent: value }
                : { ...current, [question.key]: value },
        );
        setStep(step + 1);
    };

    const send = async (event: FormEvent) => {
        event.preventDefault();
        const phone = details.phone.trim() ? parseContactPhone(details.phone, country) : undefined;
        if (status === "sending" || (phone && !phone.isPossible())) return;
        setStatus("sending");
        try {
            await submitEnquiry({
                ...answers,
                ...details,
                phone: phone?.formatInternational() ?? "",
            });
            setStatus("sent");
            onSent();
        } catch {
            setStatus("error");
        }
    };

    return (
        <form className="wizard" onSubmit={send}>
            <div className="wizard__progress" aria-hidden="true">
                <span style={{ transform: `scaleX(${(step + 1) / total})` }} />
            </div>
            <p className="eyebrow">
                {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>

            <h2 ref={heading} tabIndex={-1} className="wizard__question">
                {onDetails ? t("contact.detailsTitle") : pick(question.title)}
            </h2>

            {onDetails ? (
                <DetailsStep
                    details={details}
                    onChange={setDetails}
                    country={country}
                    onCountryChange={setCountry}
                    sending={status === "sending"}
                />
            ) : (
                <div className="wizard__choices">
                    {question.choices.map((choice) => {
                        const selected = answers[question.key] === choice.value;
                        return (
                            <button
                                key={choice.value}
                                type="button"
                                className="wizard__choice"
                                aria-pressed={selected}
                                onClick={() => choose(choice.value)}
                            >
                                {pick(choice.label)}
                                {selected && <Check aria-hidden="true" />}
                            </button>
                        );
                    })}
                </div>
            )}

            {step > 0 && (
                <button type="button" className="wizard__back" onClick={() => setStep(step - 1)}>
                    <ArrowLeft aria-hidden="true" />
                    {t("contact.back")}
                </button>
            )}

            {status === "error" && (
                <p className="field__error" role="alert">
                    {t("contact.sendError")}
                </p>
            )}
        </form>
    );
}
