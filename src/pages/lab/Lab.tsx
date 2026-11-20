import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { demos } from "../../demos/index.ts";

/**
 * Development only (see App.tsx): one demo alone on the page ground, for filming with
 * Stageshow's film.mjs. /__lab?demo=design (or mobile, web, platforms).
 */
export default function Lab() {
    const [params] = useSearchParams();
    const Demo = demos[params.get("demo") as keyof typeof demos] ?? demos.design;
    return (
        // Always on the site's near-black ground: the demos are dark and are judged on it.
        <div style={{ minHeight: "100vh", padding: "8rem 0", background: "#05070d" }}>
            <div style={{ width: "min(680px, 100%)", margin: "0 auto" }}>
                <Suspense>
                    <Demo />
                </Suspense>
            </div>
        </div>
    );
}
