// hooks/useAudioTicker.ts - rawX 대신 tickerX 사용
import { useState, useRef, useEffect, useCallback } from "react";
import { useAnimationFrame, useTransform } from "motion/react";
import { tickerX } from "@/atoms/tickerX";

const BASE_SPEED = 0.8;
const ACCEL_STEP = 0.04;
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

  const currentSpeed = useRef(0);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/wrist_band.jpg";
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const unitWidth = Math.ceil(FOOTER_HEIGHT * aspectRatio);
      setImageUnitWidth(unitWidth);

      if (audio) {
        tickerX.set(-(audio.currentTime * PIXELS_PER_SECOND));
      }
    };
  }, [audio]);

  useAnimationFrame(() => {
    if (imageUnitWidth === 0 || isDragging.current) return;

    const targetSpeed = isPlaying ? BASE_SPEED : 0;
    currentSpeed.current += (targetSpeed - currentSpeed.current) * ACCEL_STEP;

    if (isPlaying && audio) {
      tickerX.set(-(audio.currentTime * PIXELS_PER_SECOND));
    } else {
      tickerX.set(tickerX.get() - currentSpeed.current);
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