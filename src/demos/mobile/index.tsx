import {
    Stage,
    Phone,
    Expand,
    Bar,
    Avatar,
    Icon,
    Meter,
    Roll,
    Count,
    States,
    type Act,
} from "../../vendor/stageshow/kit";
import { STAGE, COMPACT, LOOK } from "../look.ts";
import "./mobile.css";

// Mobile applications: a calm study planner, phone only, told as one object
// (copied from the Stageshow gold `phone-touch`). Three beats and a payoff:
//   1. Context: the Today list of sessions.
//   2. Action: a tap on "Design review" opens its card into the session
//      detail, the way iOS cards open.
//   3. Start: the focus timer runs and the session's meter fills.
//   4. Payoff: Done marks the session complete; the same button turns
//      Completed, the timer rolls to the full 45:00 and the meter lands full.
// The loop is caused: close folds the detail back into its card, and the
// session resets unseen behind the card's clip.
//
// The opened detail is the same element as the list card: closed, Expand
// clips it to the card's rect and its header is slid down so only the foot
// of the art (title and length) shows; open, clip and slide release together.
//
// Real strings: Today, Design review, 45 min, Start/Done/Completed, Focus/
// Complete, the timer. Everything else is a line or a shape.

type Phase = "idle" | "running" | "done";
type S = { open: boolean; phase: Phase; t: number };

const START: S = { open: false, phase: "idle", t: 0 };

// Screen points (the Phone lays its screen out at true iOS points)
const CARD = { x: 16, h: 112 };
const TOPS = [136, 260, 384];
const PICK = 1;
const HEADER = 176;
// The session's length in seconds: Done marks it complete, so the timer lands here
const SESSION = 45 * 60;
// The touch cursor shows nothing between taps; it rests on the screen in
// both layouts, so the loop ends where it began
const REST = { x: 300, y: 250 };

const ART = ["mb-art--graphite", "mb-art--focus", "mb-art--slate"];
const LIST_TEXT = [
    { eyebrow: 38, title: 132, sub: 46 },
    null,
    { eyebrow: 44, title: 108, sub: 52 },
];

const time = (t: number) =>
    `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;

const script = async (a: Act<S>) => {
    await a.wait(900);
    // Beat 2: the card opens into its session
    a.mark("tap");
    await a.click("card");
    a.put({ open: true });
    await a.wait(1400);
    // Beat 3: Start sets the focus timer running
    a.mark("start");
    await a.click("start");
    a.put({ phase: "running" });
    for (let i = 0; i < 5; i++) {
        await a.wait(1000);
        a.put((s) => ({ t: s.t + 1 }));
    }
    await a.wait(300);
    // Payoff: Done on the same button marks the session complete: the timer
    // rolls to its full length, last digit first, and the meter lands
    a.mark("done");
    await a.click("start");
    a.put({ phase: "done", t: SESSION });
    await a.wait(2200);
    // The reset has a cause: close folds the detail back into the list
    a.mark("close");
    await a.click("close");
    a.put({ open: false });
    await a.wait(900);
    // Hidden behind the card's clip now: reset the session unseen
    await a.snap({ phase: "idle", t: 0 });
    await a.move(REST);
    await a.wait(300);
};

export default function MobileDemo() {
    return (
        <Stage<S>
            width={STAGE.width}
            height={STAGE.height}
            compact={COMPACT}
            theme={LOOK.theme}
            accent={LOOK.accent}
            initial={START}
            poster={{ open: true, phase: "done", t: SESSION }}
            script={script}
            cursor={{ at: REST, style: "touch" }}
            className="ms-mobile"
        >
            {(s, rect, layout) => {
                const top = TOPS[PICK];
                return (
                    <Phone
                        width={layout === "compact" ? 280 : 380}
                        dark
                        className="mb-phone"
                        data-open={s.open || undefined}
                    >
                        <div className="mb-list" data-back={s.open || undefined}>
                            <div className="mb-head">
                                <Bar w={104} h={8} r={4} tone={3} />
                                <div className="mb-head__row">
                                    <span className="mb-title">Today</span>
                                    <Avatar name="Maya" size={36} />
                                </div>
                            </div>
                            {TOPS.map((y, i) =>
                                i === PICK ? (
                                    <span
                                        key={i}
                                        className="mb-slot"
                                        data-target="card"
                                        style={{ top: y }}
                                    />
                                ) : (
                                    <div key={i} className={`mb-card ${ART[i]}`} style={{ top: y }}>
                                        <span className="mb-card__text">
                                            <span
                                                className="mb-line"
                                                style={{
                                                    width: LIST_TEXT[i]!.eyebrow,
                                                    height: 7,
                                                    opacity: 0.5,
                                                }}
                                            />
                                            <span
                                                className="mb-line"
                                                style={{ width: LIST_TEXT[i]!.title, height: 12 }}
                                            />
                                            <span
                                                className="mb-line"
                                                style={{
                                                    width: LIST_TEXT[i]!.sub,
                                                    height: 7,
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>

                        {/* The picked card and its session detail are one element */}
                        <div
                            className="mb-press"
                            style={{ transformOrigin: `50% ${top + CARD.h / 2}px` }}
                        >
                            <Expand
                                className="mb-detail"
                                open={s.open}
                                from={rect("card")}
                                radius={22}
                                duration={620}
                            >
                                <div
                                    className="mb-detail__inner"
                                    style={{
                                        transform: `translateY(${s.open ? 0 : CARD.h - HEADER}px)`,
                                    }}
                                >
                                    <div
                                        className={`mb-hero ${ART[PICK]}`}
                                        style={{
                                            clipPath: s.open
                                                ? "inset(0px 0px 0px 0px round 0px 0px 0px 0px)"
                                                : `inset(0px ${CARD.x}px 0px ${CARD.x}px round 0px 0px 22px 22px)`,
                                        }}
                                    >
                                        <span className="mb-close" data-target="close">
                                            <Icon name="close" size={14} stroke={2} />
                                        </span>
                                        <span
                                            className="mb-hero__text"
                                            style={{
                                                transform: `translateX(${s.open ? 0 : CARD.x}px)`,
                                            }}
                                        >
                                            <span className="mb-hero__eyebrow" />
                                            <span className="mb-hero__title">Design review</span>
                                            <span className="mb-hero__sub">45 min</span>
                                        </span>
                                    </div>
                                    <div className="mb-body">
                                        <div className="mb-panel">
                                            {/* Before Start: what the session is, in lines */}
                                            <div
                                                className="mb-about"
                                                data-hide={s.phase !== "idle" || undefined}
                                            >
                                                <div className="mb-stats">
                                                    {[
                                                        [34, 46],
                                                        [40, 30],
                                                        [28, 38],
                                                    ].map(([l, v], i) => (
                                                        <span key={i} className="mb-stat">
                                                            <Bar w={l} h={6} r={3} tone={3} />
                                                            <Bar w={v} h={11} r={4} tone={5} />
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="mb-desc">
                                                    <Bar w="90%" h={7} r={3} tone={2} />
                                                    <Bar w="62%" h={7} r={3} tone={2} />
                                                </div>
                                            </div>
                                            {/* After Start: the timer and the session's meter share the lane */}
                                            <div
                                                className="mb-timer"
                                                data-show={s.phase !== "idle" || undefined}
                                            >
                                                <span className="mb-timer__label">
                                                    <Roll>
                                                        {s.phase === "done" ? "Complete" : "Focus"}
                                                    </Roll>
                                                </span>
                                                <span
                                                    className="mb-timer__time"
                                                    data-done={s.phase === "done" || undefined}
                                                >
                                                    <Count
                                                        value={s.t}
                                                        format={time}
                                                        duration={900}
                                                        stagger={70}
                                                    />
                                                </span>
                                                <Meter
                                                    value={
                                                        s.phase === "done"
                                                            ? 1
                                                            : s.phase === "running"
                                                              ? 0.08 + s.t * 0.07
                                                              : 0
                                                    }
                                                    className="mb-meter"
                                                />
                                            </div>
                                        </div>
                                        <span
                                            className="mb-start"
                                            data-target="start"
                                            data-phase={s.phase}
                                        >
                                            <States
                                                value={s.phase}
                                                states={{
                                                    idle: (
                                                        <span className="mb-start__label">
                                                            <Icon name="play" size={14} filled />{" "}
                                                            Start
                                                        </span>
                                                    ),
                                                    running: (
                                                        <span className="mb-start__label">
                                                            <Icon name="check" size={14} filled />{" "}
                                                            Done
                                                        </span>
                                                    ),
                                                    done: (
                                                        <span className="mb-start__label">
                                                            <Icon name="check" size={14} filled />{" "}
                                                            Completed
                                                        </span>
                                                    ),
                                                }}
                                            />
                                        </span>
                                        <div className="mb-steps">
                                            <Bar w={72} h={8} r={4} tone={4} />
                                            {[86, 64, 92].map((w, i) => (
                                                <span key={i} className="mb-step">
                                                    <span className="mb-step__dot" />
                                                    <Bar w={w} h={8} r={4} tone={3} />
                                                    <Bar w={30} h={8} r={4} tone={2} />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Expand>
                        </div>
                    </Phone>
                );
            }}
        </Stage>
    );
}
