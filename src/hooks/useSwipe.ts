import { useRef, type PointerEvent, type MouseEvent } from "react";

/** Horizontal gestures preserve vertical page scrolling and ordinary link clicks. */
export function useSwipe(onSwipe: (direction: -1 | 1) => void) {
    const start = useRef<{ x: number; y: number } | null>(null);
    const dragged = useRef(false);
    const suppressClick = useRef(false);
    return {
        onPointerDown(event: PointerEvent<HTMLDivElement>) {
            if (!event.isPrimary || event.button !== 0) return;
            start.current = { x: event.clientX, y: event.clientY };
            dragged.current = false;
            suppressClick.current = false;
        },
        onPointerMove(event: PointerEvent<HTMLDivElement>) {
            if (!start.current) return;
            const dx = event.clientX - start.current.x;
            const dy = event.clientY - start.current.y;
            if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.3) {
                dragged.current = true;
                event.currentTarget.setPointerCapture(event.pointerId);
            }
        },
        onPointerUp(event: PointerEvent<HTMLDivElement>) {
            if (!start.current) return;
            const dx = event.clientX - start.current.x;
            suppressClick.current = dragged.current;
            if (dragged.current && Math.abs(dx) > 45) onSwipe(dx < 0 ? 1 : -1);
            start.current = null;
        },
        onPointerCancel() { start.current = null; dragged.current = false; },
        onClickCapture(event: MouseEvent<HTMLDivElement>) {
            if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; }
        },
        onDragStart(event: MouseEvent<HTMLDivElement>) { event.preventDefault(); },
    };
}
