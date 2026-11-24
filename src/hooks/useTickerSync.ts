import { useRef } from "react";
import type { RefObject } from "react";
import { useAnimationFrame } from "motion/react";
import { tickerPosition } from "@/lib/tickerPosition";
import { audio } from "@/lib/audio";
import { COAST_DECEL, offsetFor, positionAt } from "@/lib/ticker";

export const useTickerSync = (
  isPlaying: boolean,
  isReady: boolean,
  offsetRef: RefObject<number>,
  isDraggingRef: RefObject<boolean>,
) => {
  const prevSrcRef = useRef("");
  const coastSpeed = useRef(0);
  const prevTickerPosition = useRef(0);
  const wasPlaying = useRef(false);

  useAnimationFrame(() => {
    if (!isReady || isDraggingRef.current) return;

    if (audio.src !== prevSrcRef.current) {
      offsetRef.current = offsetFor(tickerPosition.get(), audio.currentTime);
      prevSrcRef.current = audio.src;
    }

    if (isPlaying && !wasPlaying.current) {
      offsetRef.current = offsetFor(tickerPosition.get(), audio.currentTime);
    }

    if (!isPlaying && wasPlaying.current) {
      coastSpeed.current = tickerPosition.get() - prevTickerPosition.current;
    }

    wasPlaying.current = isPlaying;
    prevTickerPosition.current = tickerPosition.get();

    if (isPlaying) {
      tickerPosition.set(positionAt(audio.currentTime, offsetRef.current));
    } else {
      coastSpeed.current *= COAST_DECEL;
      if (Math.abs(coastSpeed.current) > 0.01) {
        tickerPosition.set(tickerPosition.get() + coastSpeed.current);
      }
    }
  });
};
