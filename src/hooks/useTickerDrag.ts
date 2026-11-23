import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import { tickerX } from "@/atoms/tickerX";
import { audio } from "@/lib/audio";
import { seekTimeFor } from "@/lib/ticker";

export const useTickerDrag = (
  offsetRef: RefObject<number>,
  isDraggingRef: RefObject<boolean>,
) => {
  const lastPointerX = useRef(0);

  const handlePointerDown = useCallback((e: ReactPointerEvent) => {
    isDraggingRef.current = true;
    lastPointerX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [isDraggingRef]);

  const handlePointerMove = useCallback((e: ReactPointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    tickerX.set(tickerX.get() + delta);
  }, [isDraggingRef]);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const { duration } = audio;
    if (!Number.isFinite(duration) || duration === 0) return;

    audio.currentTime = seekTimeFor(tickerX.get(), offsetRef.current, duration);
  }, [isDraggingRef, offsetRef]);

  return { handlePointerDown, handlePointerMove, handlePointerUp };
};
