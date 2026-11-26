import type { ReactNode } from "react";
import type { Service } from "../content/services.ts";
import { useLocale } from "../i18n/useLocale.ts";
import "./ServiceVisual.css";

/*
 * Each service as a crisp vector illustration in the site's own colours, rather than a
 * photographed screen: it stays sharp at any size, never tilts into blur, and weighs nothing.
 */

function Design({ id }: { id: string }) {
    return (
        <svg viewBox="0 0 640 480" className="il">
            <defs>
                <pattern id={`${id}-dots`} width="18" height="18" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.3" className="il-dot" />
                </pattern>
                <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" className="il-stop-accent" />
                    <stop offset="1" className="il-stop-accent-2" />
                </linearGradient>
            </defs>
            {/* Canvas */}
            <rect x="8" y="8" width="624" height="464" rx="24" className="il-panel" />
            <rect x="8" y="8" width="624" height="464" rx="24" fill={`url(#${id}-dots)`} />
            {/* Tool rail */}
            <rect x="28" y="120" width="40" height="190" rx="12" className="il-surface il-stroke" />
            {[0, 1, 2, 3, 4].map((i) => (
                <rect key={i} x="40" y={136 + i * 34} width="16" height="16" rx="4" className={i === 1 ? "il-accent" : "il-soft"} />
            ))}

            {/* Artboard 1: the wireframe */}
            <text x="96" y="62" className="il-label">Wireframe</text>
            <rect x="96" y="74" width="196" height="300" rx="14" className="il-surface il-stroke" />
            <g className="il-wire">
                <rect x="112" y="92" width="164" height="18" rx="5" />
                <rect x="112" y="124" width="120" height="14" rx="4" />
                <rect x="112" y="146" width="90" height="14" rx="4" />
                <rect x="112" y="174" width="164" height="92" rx="8" />
                <path d="M112 174 L276 266 M276 174 L112 266" />
                <rect x="112" y="282" width="72" height="26" rx="13" />
                <rect x="112" y="324" width="164" height="34" rx="8" />
            </g>

            {/* Artboard 2: the finished design */}
            <text x="330" y="42" className="il-label">Final</text>
            <rect x="330" y="54" width="250" height="340" rx="16" className="il-surface il-stroke il-lift" />
            <rect x="348" y="72" width="60" height="10" rx="5" className="il-strong" />
            <circle cx="556" cy="77" r="9" className="il-soft" />
            <rect x="348" y="104" width="190" height="16" rx="5" className="il-strong" />
            <rect x="348" y="128" width="150" height="16" rx="5" className="il-strong" />
            <rect x="348" y="156" width="170" height="8" rx="4" className="il-soft" />
            <rect x="348" y="170" width="130" height="8" rx="4" className="il-soft" />
            <rect x="348" y="194" width="214" height="110" rx="12" fill={`url(#${id}-grad)`} />
            <path d="M348 304 L410 250 L440 274 L492 222 L562 290 L562 304 Z" className="il-overlay" />
            <rect x="348" y="320" width="96" height="30" rx="15" className="il-accent" />
            <rect x="452" y="320" width="96" height="30" rx="15" className="il-surface il-stroke" />

            {/* Swatches and type */}
            <g transform="translate(96 404)">
                <circle cx="14" cy="14" r="14" className="il-accent" />
                <circle cx="48" cy="14" r="14" className="il-accent-2" />
                <circle cx="82" cy="14" r="14" className="il-strong" />
                <circle cx="116" cy="14" r="14" className="il-soft" />
                <text x="150" y="27" className="il-type">Aa</text>
            </g>

            {/* A collaborator's cursor, adjusting the button */}
            <g className="il-cursor">
                <path d="M452 300 l0 26 l7 -7 l6 13 l6 -3 l-6 -12 l10 0 Z" className="il-accent-2 il-cursor-arrow" />
                <rect x="466" y="328" width="78" height="22" rx="6" className="il-accent-2" />
                <text x="476" y="343" className="il-tag">Maystack</text>
            </g>
        </svg>
    );
}

function Mobile({ id }: { id: string }) {
    const phone = (x: number, y: number, children: ReactNode, cls = "") => (
        <g transform={`translate(${x} ${y})`} className={cls}>
            <rect width="196" height="400" rx="38" className="il-device" />
            <rect x="9" y="9" width="178" height="382" rx="30" className="il-screen" />
            <rect x="70" y="20" width="56" height="16" rx="8" className="il-device" />
            {children}
        </g>
    );
    return (
        <svg viewBox="0 0 640 480" className="il">
            <defs>
                <linearGradient id={`${id}-card`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" className="il-stop-accent" />
                    <stop offset="1" className="il-stop-accent-2" />
                </linearGradient>
            </defs>

            {/* Back phone: a calendar */}
            {phone(
                120,
                60,
                <>
                    <rect x="26" y="56" width="90" height="12" rx="6" className="il-strong" />
                    <rect x="26" y="76" width="60" height="8" rx="4" className="il-soft" />
                    {Array.from({ length: 30 }, (_, i) => (
                        <rect
                            key={i}
                            x={26 + (i % 6) * 25}
                            y={104 + Math.floor(i / 6) * 25}
                            width="19"
                            height="19"
                            rx="6"
                            className={i === 13 ? "il-accent" : "il-soft"}
                        />
                    ))}
                    <rect x="26" y="242" width="144" height="54" rx="12" className="il-card" />
                    <rect x="38" y="256" width="70" height="8" rx="4" className="il-strong" />
                    <rect x="38" y="272" width="100" height="7" rx="3.5" className="il-soft" />
                    <rect x="26" y="306" width="144" height="54" rx="12" className="il-card" />
                    <rect x="38" y="320" width="56" height="8" rx="4" className="il-strong" />
                    <rect x="38" y="336" width="90" height="7" rx="3.5" className="il-soft" />
                </>,
                "il-back",
            )}

            {/* Front phone: a dashboard */}
            {phone(
                322,
                30,
                <>
                    <rect x="24" y="56" width="70" height="8" rx="4" className="il-soft" />
                    <rect x="24" y="72" width="110" height="14" rx="5" className="il-strong" />
                    <rect x="22" y="100" width="152" height="92" rx="16" fill={`url(#${id}-card)`} />
                    <rect x="36" y="116" width="50" height="7" rx="3.5" className="il-on-accent" opacity="0.7" />
                    <rect x="36" y="132" width="90" height="16" rx="5" className="il-on-accent" />
                    <path d="M36 176 C60 160 76 172 96 162 S136 150 160 156" className="il-on-accent-line" />
                    {[0, 1, 2].map((i) => (
                        <g key={i} transform={`translate(22 ${208 + i * 52})`}>
                            <rect width="152" height="42" rx="12" className="il-card" />
                            <circle cx="22" cy="21" r="10" className={i === 0 ? "il-accent" : i === 1 ? "il-accent-2" : "il-soft"} />
                            <rect x="40" y="13" width="60" height="7" rx="3.5" className="il-strong" />
                            <rect x="40" y="25" width="40" height="6" rx="3" className="il-soft" />
                            <rect x="118" y="17" width="22" height="8" rx="4" className="il-soft" />
                        </g>
                    ))}
                    <rect x="22" y="364" width="152" height="1" className="il-soft" />
                    {[0, 1, 2, 3].map((i) => (
                        <circle key={i} cx={46 + i * 35} cy="376" r="5" className={i === 0 ? "il-accent" : "il-soft"} />
                    ))}
                </>,
                "il-front",
            )}

            {/* A notification arriving */}
            <g className="il-float">
                <rect x="440" y="300" width="176" height="56" rx="16" className="il-surface il-stroke il-lift" />
                <circle cx="468" cy="328" r="12" className="il-accent" />
                <rect x="488" y="318" width="90" height="8" rx="4" className="il-strong" />
                <rect x="488" y="332" width="110" height="7" rx="3.5" className="il-soft" />
            </g>
        </svg>
    );
}

function Web({ id }: { id: string }) {
    return (
        <svg viewBox="0 0 640 480" className="il">
            <defs>
                <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" className="il-stop-accent-2" />
                    <stop offset="1" className="il-stop-accent" />
                </linearGradient>
            </defs>
            {/* Browser window */}
            <rect x="16" y="24" width="520" height="380" rx="18" className="il-surface il-stroke il-lift" />
            <rect x="16" y="24" width="520" height="40" rx="18" className="il-panel" />
            <rect x="16" y="50" width="520" height="14" className="il-panel" />
            {[0, 1, 2].map((i) => (
                <circle key={i} cx={40 + i * 18} cy="44" r="5" className="il-soft" />
            ))}
            <rect x="140" y="34" width="260" height="20" rx="10" className="il-surface" />
            <rect x="156" y="41" width="120" height="6" rx="3" className="il-soft" />

            {/* Page hero */}
            <rect x="44" y="88" width="50" height="8" rx="4" className="il-strong" />
            <rect x="380" y="88" width="34" height="8" rx="4" className="il-soft" />
            <rect x="424" y="88" width="34" height="8" rx="4" className="il-soft" />
            <rect x="468" y="84" width="44" height="16" rx="8" className="il-accent" />
            <rect x="44" y="126" width="200" height="20" rx="6" className="il-strong" />
            <rect x="44" y="154" width="160" height="20" rx="6" className="il-strong" />
            <rect x="44" y="186" width="190" height="8" rx="4" className="il-soft" />
            <rect x="44" y="200" width="150" height="8" rx="4" className="il-soft" />
            <rect x="44" y="224" width="84" height="28" rx="14" className="il-accent" />
            <rect x="136" y="224" width="84" height="28" rx="14" className="il-surface il-stroke" />
            {/* Hero image: a small range of peaks */}
            <rect x="272" y="120" width="240" height="140" rx="14" fill={`url(#${id}-sky)`} />
            <path d="M272 260 L330 196 L356 222 L410 160 L470 230 L490 214 L512 238 L512 260 Z" className="il-overlay" />
            {/* Cards */}
            {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${44 + i * 160} 284)`}>
                    <rect width="148" height="96" rx="12" className="il-card" />
                    <circle cx="22" cy="24" r="10" className={i === 1 ? "il-accent-2" : "il-accent"} />
                    <rect x="14" y="48" width="90" height="8" rx="4" className="il-strong" />
                    <rect x="14" y="64" width="116" height="6" rx="3" className="il-soft" />
                    <rect x="14" y="76" width="80" height="6" rx="3" className="il-soft" />
                </g>
            ))}

            {/* The same site on a phone */}
            <g className="il-float">
                <rect x="482" y="176" width="140" height="284" rx="28" className="il-device" />
                <rect x="489" y="183" width="126" height="270" rx="22" className="il-screen" />
                <rect x="530" y="191" width="44" height="12" rx="6" className="il-device" />
                <rect x="503" y="222" width="80" height="12" rx="4" className="il-strong" />
                <rect x="503" y="240" width="64" height="12" rx="4" className="il-strong" />
                <rect x="503" y="262" width="96" height="6" rx="3" className="il-soft" />
                <rect x="503" y="282" width="60" height="20" rx="10" className="il-accent" />
                <rect x="503" y="314" width="98" height="70" rx="10" fill={`url(#${id}-sky)`} />
                <rect x="503" y="394" width="98" height="44" rx="10" className="il-card" />
            </g>
        </svg>
    );
}

function Platforms() {
    const bars = [0.45, 0.62, 0.5, 0.78, 0.66, 0.9, 0.72];
    return (
        <svg viewBox="0 0 640 480" className="il">
            <rect x="12" y="20" width="616" height="430" rx="20" className="il-surface il-stroke il-lift" />
            {/* Sidebar */}
            <rect x="12" y="20" width="132" height="430" rx="20" className="il-panel" />
            <rect x="124" y="20" width="20" height="430" className="il-panel" />
            <rect x="32" y="44" width="28" height="28" rx="8" className="il-accent" />
            <rect x="68" y="52" width="52" height="10" rx="5" className="il-strong" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i} transform={`translate(26 ${104 + i * 38})`}>
                    {i === 1 && <rect x="-6" y="-9" width="110" height="30" rx="9" className="il-accent-soft" />}
                    <rect width="12" height="12" rx="3" className={i === 1 ? "il-accent" : "il-soft"} />
                    <rect x="22" y="2" width={[50, 64, 44, 58, 40, 52][i]} height="8" rx="4" className={i === 1 ? "il-strong" : "il-soft"} />
                </g>
            ))}

            {/* Top bar */}
            <rect x="166" y="40" width="200" height="28" rx="14" className="il-panel" />
            <rect x="180" y="50" width="90" height="8" rx="4" className="il-soft" />
            <circle cx="594" cy="54" r="14" className="il-accent-2" />
            <rect x="520" y="46" width="56" height="16" rx="8" className="il-soft" />

            {/* KPI cards */}
            {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${166 + i * 150} 88)`}>
                    <rect width="138" height="84" rx="14" className="il-card" />
                    <rect x="16" y="16" width="56" height="7" rx="3.5" className="il-soft" />
                    <rect x="16" y="34" width={[70, 86, 60][i]} height="18" rx="5" className="il-strong" />
                    <rect x="16" y="62" width="36" height="10" rx="5" className={i === 2 ? "il-accent-2" : "il-accent"} />
                </g>
            ))}

            {/* Chart */}
            <rect x="166" y="188" width="288" height="240" rx="14" className="il-card" />
            <rect x="184" y="206" width="90" height="9" rx="4.5" className="il-strong" />
            {bars.map((h, i) => (
                <rect
                    key={i}
                    x={190 + i * 36}
                    y={404 - h * 160}
                    width="22"
                    height={h * 160}
                    rx="6"
                    className={`il-bar ${i === 5 ? "il-accent" : "il-accent-soft"}`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                />
            ))}

            {/* Table */}
            <rect x="466" y="188" width="140" height="240" rx="14" className="il-card" />
            {[0, 1, 2, 3, 4].map((i) => (
                <g key={i} transform={`translate(480 ${212 + i * 42})`}>
                    <circle cx="10" cy="10" r="10" className="il-soft" />
                    <rect x="28" y="2" width="48" height="7" rx="3.5" className="il-strong" />
                    <rect x="28" y="14" width="34" height="6" rx="3" className="il-soft" />
                    <rect x="86" y="4" width="26" height="12" rx="6" className={i % 3 === 0 ? "il-accent" : i % 3 === 1 ? "il-accent-2" : "il-soft"} />
                </g>
            ))}
        </svg>
    );
}

export function ServiceVisual({ service, className = "" }: { service: Service; className?: string }) {
    const { pick } = useLocale();
    const id = `sv-${service.id}`;
    const art =
        service.id === "design" ? (
            <Design id={id} />
        ) : service.id === "mobile" ? (
            <Mobile id={id} />
        ) : service.id === "web" ? (
            <Web id={id} />
        ) : (
            <Platforms />
        );

    return (
        <div className={`service-visual ${className}`} role="img" aria-label={pick(service.title)}>
            {art}
        </div>
    );
}
