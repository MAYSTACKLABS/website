import { lazy } from "react";
import type { Service } from "../content/services.ts";

/** One Stageshow demo per service, loaded only when its scene is on screen. */
export const demos: Record<Service["id"], ReturnType<typeof lazy>> = {
    design: lazy(() => import("./design/index.tsx")),
    mobile: lazy(() => import("./mobile/index.tsx")),
    web: lazy(() => import("./web/index.tsx")),
    platforms: lazy(() => import("./platforms/index.tsx")),
};
