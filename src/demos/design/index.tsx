import {
    Eye,
    Frame,
    Hand,
    Image as ImageIcon,
    Minus,
    MousePointer2,
    PenTool,
    Plus,
    Square,
    Type,
} from "lucide-react";
import {
    Bar,
    Button,
    Facepile,
    Follow,
    Popover,
    Roll,
    Stage,
    Text,
    Window,
    box,
    type Act,
} from "../../vendor/stageshow/kit";
import { COMPACT, LOOK, STAGE } from "../look";
import "./design.css";

// UI/UX design: a design tool with a landing hero on the canvas. The cursor
// selects the hero's button, opens its Fill swatch, picks the brand blue and
// the button eases into it while the inspector follows. Holds on the blue
// button, then ⌘Z puts the fill back and a click on the canvas deselects.

type S = {
    hover: boolean;
    selected: boolean;
    picker: boolean;
    /** Index into SWATCHES: the button's fill */
    fill: number;
};

// The library's colors. 0 is the button's starting fill, ACCENT the brand
// blue. Compact shows the first twelve, so both stay in its two rows.
const SWATCHES = [
    "#E8EAEE",
    "#9AA0AA",
    "#5B606B",
    "#2A2D34",
    "#F25555",
    "#F59E3D",
    "#F5C842",
    "#3CC37A",
    "#2BB3A3",
    "#38BDF8",
    "#4D8BFF",
    "#1E40AF",
    "#EC5B9C",
    "#FB923C",
    "#0F766E",
    "#111318",
];
const BASE = 0;
const ACCENT = 10;

const initial: S = { hover: false, selected: false, picker: false, fill: BASE };
const poster: S = { hover: false, selected: true, picker: false, fill: ACCENT };

async function script(a: Act<S>) {
    await a.wait(600);

    // 1. Select the hero's button: hover ring, press, selection and inspector
    a.mark("select");
    await a.move({ at: "button", x: 0.88, y: 0.72 });
    await a.set({ hover: true });
    await a.wait(300);
    await a.click();
    await a.set({ hover: false, selected: true });
    await a.wait(900);

    // 2. Open its Fill swatch: the library's colors drop in under it
    a.mark("fill");
    await a.move("fill-swatch");
    await a.wait(150);
    await a.click();
    await a.set({ picker: true });
    await a.wait(700);

    // 3. Pick the brand blue: the button and the inspector ease to it
    a.mark("pick");
    await a.move({ at: "swatch-accent", x: 0.7, y: 0.72 });
    await a.wait(250);
    await a.click();
    await a.set({ fill: ACCENT });
    await a.wait(800);

    // 4. Escape closes the swatches; the blue button holds, still selected
    a.mark("payoff");
    await a.key("esc");
    await a.set({ picker: false });
    await a.wait(2100);

    // 5. ⌘Z puts the fill back, a click on the canvas deselects: the opening frame
    a.mark("undo");
    await a.key("cmd+z");
    await a.set({ fill: BASE });
    await a.wait(900);
    await a.click("blank");
    await a.set({ selected: false });
    await a.wait(900);
}

// The layers tree: bars for everything but the button the story is about
const LAYERS: {
    depth: number;
    icon: "frame" | "type" | "image" | "rect";
    w: number;
    name?: string;
}[] = [
    { depth: 0, icon: "frame", w: 34 },
    { depth: 1, icon: "rect", w: 30 },
    { depth: 1, icon: "type", w: 50 },
    { depth: 1, icon: "type", w: 40 },
    { depth: 1, icon: "frame", w: 0, name: "Button" },
    { depth: 1, icon: "image", w: 36 },
    { depth: 0, icon: "frame", w: 44 },
    { depth: 0, icon: "frame", w: 30 },
    { depth: 0, icon: "frame", w: 40 },
];

function LayerIcon({ kind }: { kind: (typeof LAYERS)[number]["icon"] }) {
    const p = { size: 12, strokeWidth: 1.7, className: "ds-icon" };
    if (kind === "type") return <Type {...p} />;
    if (kind === "image") return <ImageIcon {...p} />;
    if (kind === "rect") return <Square {...p} />;
    return <Frame {...p} />;
}

const TOOLS = [MousePointer2, Frame, Square, PenTool, Type, Hand];

export default function DesignDemo() {
    return (
        <Stage
            width={STAGE.width}
            height={STAGE.height}
            compact={COMPACT}
            theme={LOOK.theme}
            accent={LOOK.accent}
            initial={initial}
            poster={poster}
            script={script}
            cursor={{ at: "blank" }}
            className="ds"
        >
            {(s, rect, layout) => {
                const wide = layout === "wide";
                const fill = SWATCHES[s.fill];
                const btn = rect("button");
                const row = rect("fill-row");
                const props = rect("props");
                // The swatches open under the fill row, over the inspector,
                // so the button on the canvas stays in view as it changes
                const picker = {
                    left: props.x + 8,
                    top: row.y + row.height + 6,
                    width: props.width - 16,
                };
                return (
                    <>
                        <Window
                            className="ds-window"
                            data-layout={layout}
                            lead={
                                <span className="ds-tools">
                                    {TOOLS.slice(0, wide ? 6 : 4).map((Tool, i) => (
                                        <span
                                            key={i}
                                            className="ds-tool"
                                            data-active={i === 0 || undefined}
                                        >
                                            <Tool size={14} strokeWidth={1.6} />
                                        </span>
                                    ))}
                                </span>
                            }
                            toolbar={
                                <span className="ds-share">
                                    {wide && <Facepile size={22} names={["Ana", "Leo"]} />}
                                    <Button size="small">Share</Button>
                                </span>
                            }
                        >
                            <div className="ds-body">
                                {wide && (
                                    <aside className="ds-layers" data-crop>
                                        <div className="ds-file">
                                            <Bar w={64} h={6} tone={5} />
                                            <Bar w={40} h={5} tone={3} />
                                        </div>
                                        <div className="ds-tree">
                                            {LAYERS.map((l, i) => (
                                                <div
                                                    key={i}
                                                    className="ds-layer"
                                                    data-selected={
                                                        (l.name && s.selected) || undefined
                                                    }
                                                    data-parent={
                                                        (i === 0 && s.selected) || undefined
                                                    }
                                                    style={{ paddingLeft: 10 + l.depth * 14 }}
                                                >
                                                    <LayerIcon kind={l.icon} />
                                                    {l.name ? (
                                                        <Text className="ds-layer-name">
                                                            {l.name}
                                                        </Text>
                                                    ) : (
                                                        <Bar
                                                            w={l.w}
                                                            h={5}
                                                            tone={l.depth === 0 ? 4 : 3}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </aside>
                                )}

                                <div className="ds-canvas" data-crop>
                                    <div className="ds-frame-wrap">
                                        <Text className="ds-frame-label">Hero</Text>
                                        {/* The landing hero being designed: a dark page, bars for copy */}
                                        <div className="ds-frame">
                                            <div className="ds-nav">
                                                <Bar w={10} h={10} r={3} tone={5} />
                                                <span className="ds-nav-links">
                                                    <Bar w={wide ? 20 : 14} h={4} tone={3} />
                                                    <Bar w={wide ? 16 : 12} h={4} tone={3} />
                                                    {wide && <Bar w={22} h={4} tone={3} />}
                                                </span>
                                                <Bar w={wide ? 28 : 20} h={10} r={5} tone={3} />
                                            </div>
                                            <div className="ds-head">
                                                <Bar
                                                    w={wide ? 150 : 96}
                                                    h={wide ? 10 : 8}
                                                    r={3}
                                                    tone={5}
                                                />
                                                <Bar
                                                    w={wide ? 112 : 70}
                                                    h={wide ? 10 : 8}
                                                    r={3}
                                                    tone={5}
                                                />
                                            </div>
                                            <div className="ds-sub">
                                                <Bar w={wide ? 128 : 84} h={4} tone={3} />
                                                <Bar w={wide ? 96 : 62} h={4} tone={3} />
                                            </div>
                                            <span
                                                className="ds-cta"
                                                data-target="button"
                                                data-accent={s.fill === ACCENT || undefined}
                                                style={{ background: fill }}
                                            >
                                                <Text className="ds-cta-label">Get started</Text>
                                            </span>
                                            <div className="ds-art" />
                                        </div>
                                    </div>
                                    <div className="ds-blank" data-target="blank" />
                                </div>

                                <aside className="ds-props" data-target="props" data-crop>
                                    <div className="ds-props-tabs">
                                        <Bar w={34} h={6} tone={5} />
                                        <Bar w={wide ? 44 : 30} h={6} tone={3} />
                                        <span className="ds-zoom">
                                            <Bar w={22} h={5} tone={3} />
                                        </span>
                                    </div>
                                    <div className="ds-props-body">
                                        {/* Nothing selected: the page's own settings */}
                                        <div
                                            className="ds-props-layer"
                                            data-show={!s.selected || undefined}
                                        >
                                            <section className="ds-section">
                                                <div className="ds-section-head">
                                                    <Bar w={28} h={6} tone={5} />
                                                </div>
                                                <span className="ds-field">
                                                    <span
                                                        className="ds-swatch"
                                                        style={{ background: "#111113" }}
                                                    />
                                                    <Bar w={44} h={5} tone={4} />
                                                    <Bar
                                                        w={18}
                                                        h={5}
                                                        tone={3}
                                                        style={{ marginLeft: "auto" }}
                                                    />
                                                </span>
                                            </section>
                                            {[44, 36, 40].map((w, i) => (
                                                <section key={i} className="ds-section">
                                                    <div className="ds-section-head">
                                                        <Bar w={w} h={6} tone={5} />
                                                        <Plus
                                                            size={12}
                                                            strokeWidth={1.7}
                                                            className="ds-icon"
                                                        />
                                                    </div>
                                                </section>
                                            ))}
                                        </div>

                                        {/* The button: its layout, then the Fill the story changes */}
                                        <div
                                            className="ds-props-layer"
                                            data-show={s.selected || undefined}
                                        >
                                            {wide && (
                                                <section className="ds-section">
                                                    <div className="ds-section-head">
                                                        <Bar w={40} h={6} tone={5} />
                                                    </div>
                                                    {[
                                                        [26, 20],
                                                        [22, 18],
                                                    ].map((pair, i) => (
                                                        <div key={i} className="ds-pair">
                                                            {pair.map((w, j) => (
                                                                <span key={j} className="ds-field">
                                                                    <Bar w={7} h={5} tone={3} />
                                                                    <Bar w={w} h={5} tone={4} />
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </section>
                                            )}
                                            <section className="ds-section">
                                                <div className="ds-section-head">
                                                    <Text className="ds-section-title">Fill</Text>
                                                    <Plus
                                                        size={12}
                                                        strokeWidth={1.7}
                                                        className="ds-icon"
                                                    />
                                                </div>
                                                <div className="ds-fill-row" data-target="fill-row">
                                                    <span
                                                        className="ds-field ds-field-wide"
                                                        data-open={s.picker || undefined}
                                                    >
                                                        <span
                                                            className="ds-swatch"
                                                            data-target="fill-swatch"
                                                            style={{ background: fill }}
                                                        />
                                                        <Roll className="ds-hex">
                                                            {fill.slice(1)}
                                                        </Roll>
                                                    </span>
                                                    {wide && (
                                                        <Eye
                                                            size={12}
                                                            strokeWidth={1.7}
                                                            className="ds-icon"
                                                        />
                                                    )}
                                                    <Minus
                                                        size={12}
                                                        strokeWidth={1.7}
                                                        className="ds-icon"
                                                    />
                                                </div>
                                            </section>
                                            {[38, 42, 34].map((w, i) => (
                                                <section key={i} className="ds-section">
                                                    <div className="ds-section-head">
                                                        <Bar w={w} h={6} tone={5} />
                                                        <Plus
                                                            size={12}
                                                            strokeWidth={1.7}
                                                            className="ds-icon"
                                                        />
                                                    </div>
                                                </section>
                                            ))}
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </Window>

                        {/* Hover, then the selection ring springing onto the measured button */}
                        <div
                            className="ds-hover"
                            data-show={(s.hover && !s.selected) || undefined}
                            style={box(btn)}
                        />
                        <Follow className="ds-select" to={s.selected ? btn : null}>
                            <i data-c="tl" />
                            <i data-c="tr" />
                            <i data-c="bl" />
                            <i data-c="br" />
                        </Follow>

                        {/* The library's swatches, under the Fill row */}
                        <Popover
                            show={s.picker}
                            origin="top"
                            className="ds-picker"
                            data-layout={layout}
                            style={picker}
                        >
                            <div className="ds-picker-head">
                                <Bar w={38} h={5} tone={5} />
                                <Bar w={30} h={5} tone={3} />
                            </div>
                            <div className="ds-grid">
                                {SWATCHES.slice(0, wide ? 16 : 12).map((c, i) => (
                                    <span
                                        key={c}
                                        className="ds-chip"
                                        data-current={i === s.fill || undefined}
                                        data-target={i === ACCENT ? "swatch-accent" : undefined}
                                        style={{ background: c }}
                                    />
                                ))}
                            </div>
                        </Popover>
                    </>
                );
            }}
        </Stage>
    );
}
