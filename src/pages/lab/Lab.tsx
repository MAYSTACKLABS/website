import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { demos } from "../../demos/index.ts";
import "../../vendor/stageshow/kit/stageshow.css";

/**
 * Development only (see App.tsx): one demo alone on the page ground, for filming with
 * Stageshow's film.mjs. /__lab?demo=design (or mobile, web, platforms).
 */
export default function Lab() {
    const [params] = useSearchParams();
    const Demo = demos[params.get("demo") as keyof typeof demos] ?? demos.design;
    return (
        <div style={{ width: "min(680px, 100%)", margin: "8rem auto" }}>
            <Suspense>
                <Demo />
            </Suspense>
        </div>
    );
}
