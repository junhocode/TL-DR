import { useRef } from "react";
import { useTransform } from "motion/react";
import { tickerX } from "@/atoms/tickerX";
import { useTickerSync } from "@/hooks/useTickerSync";
import { useTickerDrag } from "@/hooks/useTickerDrag";
import { wrapPosition } from "@/lib/ticker";

export const useAudioTicker = (isPlaying: boolean, imageUnitWidth: number) => {
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);

  const visualX = useTransform(tickerX, (v) => wrapPosition(v, imageUnitWidth));

  useTickerSync(isPlaying, imageUnitWidth > 0, offsetRef, isDraggingRef);
  const dragHandlers = useTickerDrag(offsetRef, isDraggingRef);

  return { visualX, ...dragHandlers };
};
