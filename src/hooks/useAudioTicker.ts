import { useState, useRef, useEffect, useCallback } from "react";
import { useAnimationFrame, useTransform } from "motion/react";
import { tickerX } from "@/atoms/tickerX";

const BASE_SPEED = 0.8;
const DECEL = 0.97;
const FPS = 60;
const PIXELS_PER_SECOND = BASE_SPEED * FPS;
const FOOTER_HEIGHT = 48;

interface UseAudioTickerProps {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  duration: number;
}

export const useAudioTicker = ({ audio, isPlaying, duration }: UseAudioTickerProps) => {
  const [imageUnitWidth, setImageUnitWidth] = useState(0);

  const visualX = useTransform(tickerX, (v) => {
    if (imageUnitWidth === 0) return 0;
    return ((v % imageUnitWidth) - imageUnitWidth) % imageUnitWidth;
  });

  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const offsetRef = useRef(0);
  const prevAudioRef = useRef<HTMLAudioElement | null>(null);
  const coastSpeed = useRef(0);
  const prevTickerX = useRef(0);
  const wasPlaying = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/wrist_band.jpg";
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      setImageUnitWidth(Math.ceil(FOOTER_HEIGHT * aspectRatio));
    };
  }, []);

  useAnimationFrame(() => {
    if (imageUnitWidth === 0 || isDragging.current) return;

    if (audio && audio !== prevAudioRef.current) {
      offsetRef.current = tickerX.get() + audio.currentTime * PIXELS_PER_SECOND;
      prevAudioRef.current = audio;
    }

    if (isPlaying && !wasPlaying.current && audio) {
      offsetRef.current = tickerX.get() + audio.currentTime * PIXELS_PER_SECOND;
    }

    // 재생 → 정지 — 감속 초기 속도 저장
    if (!isPlaying && wasPlaying.current) {
      coastSpeed.current = tickerX.get() - prevTickerX.current;
    }

    wasPlaying.current = isPlaying;
    prevTickerX.current = tickerX.get();

    if (isPlaying && audio) {
      tickerX.set(-(audio.currentTime * PIXELS_PER_SECOND) + offsetRef.current);
    } else {
      coastSpeed.current *= DECEL;
      if (Math.abs(coastSpeed.current) > 0.01) {
        tickerX.set(tickerX.get() + coastSpeed.current);
      }
    }
  });

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastPointerX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    tickerX.set(tickerX.get() + delta);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (!audio || duration === 0) return;

    const totalMoved = Math.abs(tickerX.get());
    const calculatedTime = (totalMoved / PIXELS_PER_SECOND) % duration;
    audio.currentTime = calculatedTime;
  }, [audio, duration]);

  return {
    imageUnitWidth,
    visualX,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};