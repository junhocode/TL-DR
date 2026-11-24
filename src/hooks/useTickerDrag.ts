import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import { tickerPosition } from "@/lib/tickerPosition";
import { audio } from "@/lib/audio";
import { seekTimeFor } from "@/lib/ticker";

export const useTickerDrag = (
  offsetRef: RefObject<number>,
  isDraggingRef: RefObject<boolean>,
) => {
  const activePointerId = useRef<number | null>(null);
  const lastPointerX = useRef(0);

  const handlePointerDown = useCallback((e: ReactPointerEvent) => {
    if (activePointerId.current !== null) return;
    activePointerId.current = e.pointerId;
    isDraggingRef.current = true;
    lastPointerX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [isDraggingRef]);

  const handlePointerMove = useCallback((e: ReactPointerEvent) => {
    if (e.pointerId !== activePointerId.current) return;
    const delta = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    tickerPosition.set(tickerPosition.get() + delta);
  }, []);

  const handlePointerUp = useCallback((e: ReactPointerEvent) => {
    if (e.pointerId !== activePointerId.current) return;
    activePointerId.current = null;
    isDraggingRef.current = false;

    const { duration } = audio;
    if (!Number.isFinite(duration) || duration === 0) return;

    audio.currentTime = seekTimeFor(tickerPosition.get(), offsetRef.current, duration);
  }, [isDraggingRef, offsetRef]);

  return { handlePointerDown, handlePointerMove, handlePointerUp };
};
