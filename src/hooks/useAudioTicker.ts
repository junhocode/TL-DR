import { useState, useRef, useEffect } from "react";
import { useMotionValue, useAnimationFrame, useTransform } from "motion/react";

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

  const rawX = useMotionValue(0);
  
  const visualX = useTransform(rawX, (v) => {
    if (imageUnitWidth === 0) return 0;
    return ((v % imageUnitWidth) - imageUnitWidth) % imageUnitWidth;
  });

  const currentSpeed = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/wrist_band.jpg";
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const unitWidth = Math.ceil(FOOTER_HEIGHT * aspectRatio);
      setImageUnitWidth(unitWidth);
      
      if (audio) {
        rawX.set(-(audio.currentTime * PIXELS_PER_SECOND));
      }
    };
  }, [audio, rawX]);

  useAnimationFrame(() => {
    if (imageUnitWidth === 0 || isDragging.current) return;

    const targetSpeed = isPlaying ? BASE_SPEED : 0;
    currentSpeed.current += (targetSpeed - currentSpeed.current) * ACCEL_STEP;
    
    if (isPlaying && audio) {
      rawX.set(-(audio.currentTime * PIXELS_PER_SECOND));
    } else {
      rawX.set(rawX.get() - currentSpeed.current);
    }
  });

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (!audio || duration === 0) return;

    const totalMoved = Math.abs(rawX.get());
    const calculatedTime = (totalMoved / PIXELS_PER_SECOND) % duration;
    
    audio.currentTime = calculatedTime;
  };

  const handleDrag = (_: any, info: { delta: { x: number } }) => {
    rawX.set(rawX.get() + info.delta.x);
  };

  return {
    imageUnitWidth,
    visualX,
    handleDragStart,
    handleDragEnd,
    handleDrag
  };
};