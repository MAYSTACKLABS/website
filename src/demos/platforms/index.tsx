import type { ReactNode } from "react";
import {
    Avatar,
    Badge,
    Bar,
    Button,
    Collapse,
    Count,
    Roll,
    Spinner,
    Stage,
    Window,
    type Act,
} from "../../vendor/stageshow/kit";
import { COMPACT, LOOK, STAGE } from "../look";
import "./platforms.css";

// Custom platforms: an internal approvals tool, the kind a team uses all day.
// Copied from the dark-hero gold (a new row at the top of a dark list, its
// status changing on its own pill) with table-edit's "the total follows a
// beat after its cause".
//
// Beats:
// 1. The queue at rest: "Awaiting review" reads 12, one real request below.
// 2. A new trade-account request drops in at the top and carries the list
//    down; the headline count rolls up to 13 a beat after it lands.
// 3. The cursor goes to its Approve button and clicks: the button turns
//    pending on itself (a spinner grows into its own icon slot).
// 4. The pill rolls Pending -> Approved, the one lit color in the scene;
//    the button, its job done, fades; the count rolls back to 12.
// 5. Payoff holds 2s, then the approved request leaves the queue (the
//    queue only holds what is awaiting review): that exit is the reset.
//
// Real strings: the title, the count's label, the new request (name, kind,
// status), the button, and the request it lands above. The rest is filler.

type S = { open: boolean; busy: boolean; ok: boolean; count: number };

const initial: S = { open: false, busy: false, ok: false, count: 12 };
const poster: S = { open: true, busy: false, ok: true, count: 12 };

async function script(a: Act<S>) {
    await a.wait(1500);
    // 2. A request arrives; the count follows once its row has landed
    a.mark("arrive");
    a.put({ open: true });
    await a.wait(450);
    a.put({ count: 13 });
    await a.wait(1700);

    // 3. The cursor goes to Approve; the button turns pending on itself
    await a.move({ at: "approve", x: 0.8, y: 0.62 });
    await a.wait(150);
    a.mark("approve");
    await a.click({ at: "approve", x: 0.8, y: 0.62 });
    a.put({ busy: true });
    await a.wait(750);

    // 4. Approved on the same pill; the queue's count follows a beat later
    a.mark("approved");
    a.put({ ok: true });
    await a.wait(350);
    a.put({ count: 12 });
    // The hand leaves the finished row, back to where it rests
    await a.move(a.layout === "compact" ? { x: 264, y: 285 } : { x: 552, y: 405 }, {
        duration: 900,
    });
    await a.wait(1700);

    // 5. Approved requests leave the queue: the row closes, the list closes
    // up under it, and the closed row resets unseen
    a.mark("leave");
    a.put({ open: false });
    await a.wait(800);
    await a.snap({ busy: false, ok: false });
    await a.wait(300);
}

// Requests already in the queue: one real, the rest placeholder at real line heights
const OLD = [
    { name: "Halden Co", w: 0 },
    { name: null, w: 120 },
    { name: null, w: 96 },
    { name: null, w: 132 },
];

export default function Platforms() {
    return (
        <Stage<S>
            width={STAGE.width}
            height={STAGE.height}
            compact={COMPACT}
            theme={LOOK.theme}
            accent={LOOK.accent}
            initial={initial}
            poster={poster}
            script={script}
            cursor={{ at: { wide: { x: 552, y: 405 }, compact: { x: 264, y: 285 } } }}
            className="pf"
        >
            {(s, _rect, layout) => (
                <Window
                    url="ops.kestrel.co/approvals"
                    className="pf-win"
                    sidebarWidth={168}
                    sidebar={layout === "compact" ? undefined : <Side />}
                >
                    <div className="pf-body">
                        <header className="pf-head">
                            <div className="pf-title">Approvals</div>
                            <div className="pf-stat">
                                <span className="pf-stat__label">Awaiting review</span>
                                <Count className="pf-stat__value" value={s.count} duration={700} />
                            </div>
                        </header>
                        <div className="pf-list">
                            <Collapse open={s.open} reveal="drop">
                                <Request
                                    lead
                                    name="Ivy Moreno"
                                    kind="Trade account"
                                    status={
                                        <Badge
                                            tone={s.ok ? "accent" : "neutral"}
                                            dot
                                            className="pf-badge"
                                        >
                                            <Roll>{s.ok ? "Approved" : "Pending"}</Roll>
                                        </Badge>
                                    }
                                    action={
                                        <Button
                                            size="small"
                                            className="pf-approve"
                                            data-target="approve"
                                            data-done={s.ok || undefined}
                                            icon={s.busy ? <Spinner size={12} /> : undefined}
                                        >
                                            Approve
                                        </Button>
                                    }
                                />
                            </Collapse>
                            {OLD.map((r, i) =>
                                r.name ? (
                                    <Request
                                        key={i}
                                        name={r.name}
                                        kind="Net-30 terms"
                                        status={
                                            <Badge
                                                tone="neutral"
                                                dot
                                                className="pf-badge pf-badge--old"
                                            >
                                                Pending
                                            </Badge>
                                        }
                                        action={
                                            <Button
                                                size="small"
                                                className="pf-approve pf-approve--old"
                                            >
                                                Approve
                                            </Button>
                                        }
                                    />
                                ) : (
                                    <div key={i} className="pf-row pf-row--filler">
                                        <span className="pf-who">
                                            <Bar w={28} h={28} r={14} tone={1} />
                                            <span className="pf-lines pf-lines--filler">
                                                <Bar w={r.w} h={8} r={4} tone={2} />
                                                <Bar w={r.w - 36} h={7} r={3.5} tone={1} />
                                            </span>
                                        </span>
                                        <Bar w={68} h={20} r={10} tone={1} />
                                        <Bar w={66} h={24} r={6} tone={1} className="pf-act" />
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </Window>
            )}
        </Stage>
    );
}

function Request({
    lead,
    name,
    kind,
    status,
    action,
}: {
    lead?: boolean;
    name: string;
    kind: string;
    status: ReactNode;
    action: ReactNode;
}) {
    return (
        <div className="pf-row" data-lead={lead || undefined}>
            <span className="pf-who">
                <Avatar name={name} size={28} />
                <span className="pf-lines">
                    <span className="pf-name">{name}</span>
                    <span className="pf-kind">{kind}</span>
                </span>
            </span>
            <span className="pf-status">{status}</span>
            <span className="pf-act">{action}</span>
        </div>
    );
}

// The app's own navigation: filler, with the current page lit one step
function Side() {
    return (
        <nav className="pf-side">
            {[64, 88, 52, 76, 60].map((w, i) => (
                <span key={i} className="pf-nav" data-active={i === 1 || undefined}>
                    <Bar w={12} h={12} r={3} tone={i === 1 ? 4 : 2} />
                    <Bar w={w} h={6} tone={i === 1 ? 4 : 2} />
                </span>
            ))}
        </nav>
    );
}
