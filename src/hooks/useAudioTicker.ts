import { useState, useRef, useEffect, useCallback } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useAnimationFrame, useTransform } from "motion/react";
import { tickerX } from "@/atoms/tickerX";
import { FOOTER_HEIGHT } from "@/constants/layout";
import { audio } from "@/lib/audio";
import wristBand from "@/assets/images/wrist_band.jpg";

const BASE_SPEED = 0.8;
const DECEL = 0.97;
const FPS = 60;
const PIXELS_PER_SECOND = BASE_SPEED * FPS;

export const useAudioTicker = (isPlaying: boolean) => {
  const [imageUnitWidth, setImageUnitWidth] = useState(0);

  const visualX = useTransform(tickerX, (v) => {
    if (imageUnitWidth === 0) return 0;
    return ((v % imageUnitWidth) - imageUnitWidth) % imageUnitWidth;
  });

  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const offsetRef = useRef(0);
  const prevSrcRef = useRef("");
  const coastSpeed = useRef(0);
  const prevTickerX = useRef(0);
  const wasPlaying = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.src = wristBand;
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      setImageUnitWidth(Math.ceil(FOOTER_HEIGHT * aspectRatio));
    };
  }, []);

  useAnimationFrame(() => {
    if (imageUnitWidth === 0 || isDragging.current) return;

    if (audio.src !== prevSrcRef.current) {
      offsetRef.current = tickerX.get() + audio.currentTime * PIXELS_PER_SECOND;
      prevSrcRef.current = audio.src;
    }

    if (isPlaying && !wasPlaying.current) {
      offsetRef.current = tickerX.get() + audio.currentTime * PIXELS_PER_SECOND;
    }

    if (!isPlaying && wasPlaying.current) {
      coastSpeed.current = tickerX.get() - prevTickerX.current;
    }

    wasPlaying.current = isPlaying;
    prevTickerX.current = tickerX.get();

    if (isPlaying) {
      tickerX.set(-(audio.currentTime * PIXELS_PER_SECOND) + offsetRef.current);
    } else {
      coastSpeed.current *= DECEL;
      if (Math.abs(coastSpeed.current) > 0.01) {
        tickerX.set(tickerX.get() + coastSpeed.current);
      }
    }
  });

  const handlePointerDown = useCallback((e: ReactPointerEvent) => {
    isDragging.current = true;
    lastPointerX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: ReactPointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    tickerX.set(tickerX.get() + delta);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const { duration } = audio;
    if (!Number.isFinite(duration) || duration === 0) return;

    const raw = (offsetRef.current - tickerX.get()) / PIXELS_PER_SECOND;
    audio.currentTime = Math.min(Math.max(raw, 0), duration);
  }, []);

  return {
    imageUnitWidth,
    visualX,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
