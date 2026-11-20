import type { ReactNode } from "react";
import {
    Bar,
    Button,
    Caret,
    Chart,
    Icon,
    Prompt,
    Roll,
    Spinner,
    Stage,
    Window,
    type Act,
} from "../../vendor/stageshow/kit";
import { COMPACT, LOOK, STAGE } from "../look.ts";
import "./web.css";

// Web development: a site going live. Copied from the `loading` gold (a page
// arriving into its own skeleton, top to bottom, chrome real throughout),
// with the terminal satellite of `ruled-bento` straddling the browser's left
// edge. A system story, so no cursor. Beats:
//   1. A push has just been typed; the browser holds the preview in skeleton.
//   2. The terminal builds: a spinner cell turns into a tick, "Built".
//   3. It deploys: a second spinner becomes a tick, "Deployed".
//   4. The address rolls from the preview to the live domain, its spinner
//      becomes a lock, and the page resolves top to bottom.
//   5. The payoff holds. Then a new `git push` is typed: the page drops back
//      to its skeleton, the address back to the preview, and the old output
//      scrolls out of the terminal: the next deploy is the reset.
//
// Real strings: the address, the headline, the button, the command, Built
// and Deployed (plus the wordmark). Everything else is bars.

type S = {
    step: 0 | 1 | 2 | 3; // terminal output so far
    live: boolean; // the address and its lock
    ready: boolean; // the page resolved
    typed: string; // the next push, on the new prompt
    sent: boolean; // the next push entered: caret gone, output scrolling out
};

const INITIAL: S = { step: 0, live: false, ready: false, typed: "", sent: false };
const POSTER: S = { step: 3, live: true, ready: true, typed: "", sent: false };
const CMD = "git push";
const CHART = [12, 15, 13, 19, 18, 24, 22, 29, 27, 34, 38];

async function script(a: Act<S>) {
    // Compact has no terminal: the address spinner alone carries the build, so it waits less
    const step = a.layout === "wide" ? 1700 : 900;
    await a.wait(1000);
    a.mark("build");
    a.set({ step: 1 });
    await a.wait(step);
    a.set({ step: 2 });
    await a.wait(step);
    a.mark("live");
    a.set({ step: 3, live: true });
    await a.wait(250);
    a.set({ ready: true });
    // The payoff: the live page, the tick, a waiting prompt
    await a.wait(2800);
    a.mark("next");
    for (let i = 1; i <= CMD.length; i++) {
        a.set({ typed: CMD.slice(0, i) });
        await a.wait(55);
    }
    await a.wait(350);
    // Enter: the next deploy starts, and the page goes back to waiting for it
    a.set({ sent: true, live: false, ready: false });
    await a.wait(900);
    // The new prompt now sits where the first one did: swap back unseen
    await a.snap({ ...INITIAL });
}

/** One terminal cell: a spinner while working, a tick once done. */
function Cell({ done }: { done: boolean }) {
    return (
        <span className="web-cell" data-done={done || undefined}>
            <Spinner size={10} className="web-cell__spin" />
            <span className="ok web-cell__tick">✓</span>
        </span>
    );
}

/** A slot where a skeleton bar and its real content share one cell. */
function Slot({
    i,
    bar,
    children,
    className,
}: {
    i: number;
    bar: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    return (
        <span
            className={`web-slot${className ? ` ${className}` : ""}`}
            style={{ ["--i" as string]: i }}
        >
            <span className="web-sk">{bar}</span>
            <span className="web-real">{children}</span>
        </span>
    );
}

export default function WebDemo() {
    return (
        <Stage<S>
            width={STAGE.width}
            height={STAGE.height}
            compact={COMPACT}
            theme={LOOK.theme}
            accent={LOOK.accent}
            initial={INITIAL}
            poster={POSTER}
            script={script}
            className="web"
        >
            {(s, _rect, layout) => {
                const wide = layout === "wide";
                return (
                    <>
                        <Window
                            className="web-browser"
                            url={
                                <span className="web-url" data-live={s.live || undefined}>
                                    <span className="web-url__icon">
                                        <Spinner size={11} className="web-url__spin" />
                                        <Icon
                                            name="lock"
                                            size={11}
                                            filled
                                            className="web-url__lock"
                                        />
                                    </span>
                                    <Roll>
                                        {s.live ? "northwind.app" : "preview.northwind.app"}
                                    </Roll>
                                </span>
                            }
                        >
                            <div className="web-page" data-ready={s.ready || undefined}>
                                {/* The site's own nav: the wordmark loads, the links stay quiet */}
                                <div className="web-nav">
                                    <Slot i={0} bar={<Bar w={74} h={9} r={4.5} tone={2} />}>
                                        <span className="web-mark">Northwind</span>
                                    </Slot>
                                    <span className="web-links">
                                        <Bar w={38} h={6} r={3} tone={2} />
                                        <Bar w={46} h={6} r={3} tone={2} />
                                        <Bar w={34} h={6} r={3} tone={2} />
                                    </span>
                                    <Bar w={64} h={24} r={12} tone={2} className="web-navcta" />
                                </div>

                                {/* The hero: one real headline, one button, bars for the rest */}
                                <div className="web-hero">
                                    <Slot
                                        i={1}
                                        className="web-headline-slot"
                                        bar={
                                            <span className="web-sk-lines">
                                                <Bar w={wide ? 244 : 210} h={16} r={6} tone={2} />
                                                <Bar w={wide ? 176 : 150} h={16} r={6} tone={2} />
                                            </span>
                                        }
                                    >
                                        <span className="web-headline">
                                            <span>Your next launch,</span>
                                            <span>already live.</span>
                                        </span>
                                    </Slot>
                                    <Slot
                                        i={2}
                                        bar={
                                            <span className="web-sk-lines web-sk-lines--sub">
                                                <Bar w={wide ? 268 : 236} h={7} r={3.5} tone={2} />
                                                <Bar w={wide ? 196 : 170} h={7} r={3.5} tone={2} />
                                            </span>
                                        }
                                    >
                                        <span className="web-sk-lines web-sk-lines--sub">
                                            <Bar w={wide ? 268 : 236} h={7} r={3.5} tone={3} />
                                            <Bar w={wide ? 196 : 170} h={7} r={3.5} tone={3} />
                                        </span>
                                    </Slot>
                                    <Slot i={3} bar={<Bar w={128} h={32} r={8} tone={2} />}>
                                        <Button variant="primary" size="large" className="web-cta">
                                            Start a project
                                        </Button>
                                    </Slot>
                                </div>

                                {/* The product shot below the fold: filler, cut by the stage */}
                                <Slot
                                    i={4}
                                    className="web-shot-slot"
                                    bar={<span className="web-shot web-shot--sk" />}
                                >
                                    <span className="web-shot">
                                        <span className="web-shot__head">
                                            <Bar w={86} h={7} r={3.5} tone={3} />
                                            <Bar w={40} h={7} r={3.5} tone={2} />
                                        </span>
                                        <Chart
                                            data={CHART}
                                            width={wide ? 360 : 282}
                                            height={130}
                                            show={s.ready}
                                            className="web-chart"
                                        />
                                    </span>
                                </Slot>
                            </div>
                        </Window>

                        {wide && (
                            <Window
                                chrome="terminal"
                                lights="grey"
                                title="northwind — zsh"
                                className="web-term"
                            >
                                <div className="web-track" data-sent={s.sent || undefined}>
                                    <Prompt path="~/northwind">{CMD}</Prompt>
                                    <div className="web-out" data-show={s.step >= 1 || undefined}>
                                        <Cell done={s.step >= 2} />
                                        <Roll>{s.step >= 2 ? "Built" : "Building"}</Roll>
                                        <span
                                            className="dim web-aside"
                                            data-show={s.step >= 2 || undefined}
                                        >
                                            {" "}
                                            in 14s
                                        </span>
                                    </div>
                                    <div className="web-out" data-show={s.step >= 2 || undefined}>
                                        <Cell done={s.step >= 3} />
                                        <Roll>{s.step >= 3 ? "Deployed" : "Deploying"}</Roll>
                                    </div>
                                    <Prompt
                                        path="~/northwind"
                                        className="web-out web-next"
                                        data-show={s.step >= 3 || undefined}
                                    >
                                        {s.typed}
                                        {!s.sent && <Caret still={s.typed.length > 0} />}
                                    </Prompt>
                                </div>
                            </Window>
                        )}
                    </>
                );
            }}
        </Stage>
    );
}
