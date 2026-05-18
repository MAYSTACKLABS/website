import { Code2, Gauge, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const reasons = [
    { label: "React", value: "100%", Icon: Code2 },
    { label: "UI Systems", value: "95%", Icon: Layers3 },
    { label: "Performance", value: "90%", Icon: Gauge },
    { label: "Security", value: "85%", Icon: ShieldCheck },
    { label: "Motion", value: "80%", Icon: Sparkles },
];

export default function Why() {
    const { t } = useTranslation();

    return (
        <section className="ms-section" id="why">
            <div className="ms-container">
                <div className="mb-8 text-center">
                    <p className="ms-eyebrow justify-center" style={{ color: "var(--ms-muted-text)" }}>{t("home.why.eyebrow")}</p>
                    <h2 className="mt-3 text-4xl font-bold" style={{ color: "var(--ms-text)" }}>{t("home.why.title")}</h2>
                </div>

                <div className="ms-glass grid gap-5 rounded-lg p-5 sm:grid-cols-2 md:grid-cols-5 md:p-7">
                    {reasons.map(({ label, value, Icon }) => (
                        <div key={label} className="grid justify-items-center gap-3 text-center">
                            <div className="relative grid h-24 w-24 place-items-center rounded-full border-[7px] border-white/12">
                                <div className="absolute inset-[-7px] rounded-full border-[7px] border-emerald-300 border-r-white/12" />
                                <Icon className="relative h-7 w-7 text-white/78" />
                            </div>
                            <div className="text-xl font-bold text-[#18dbc9]">{value}</div>
                            <div className="text-sm font-semibold" style={{ color: "var(--ms-muted-text)" }}>{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
